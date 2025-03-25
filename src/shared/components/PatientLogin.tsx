'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { LoginIcon } from '@/src/shared/ui/Icon';
import { useLanguageStore } from '@/src/store/language';

// Translations
const translations = {
  ru: {
    title: 'Вход в личный кабинет пациента',
    phoneLabel: 'Укажите номер телефона',
    sendSmsButton: 'Отправить SMS-код',
    privacyText: 'Нажимая кнопку «Отправить SMS-код», вы подтверждаете своё согласие на',
    privacyLink: 'обработку персональных данных',
    smsVerificationText: 'Введите 4 цифры из входящего SMS',
    confirmCodeButton: 'Подтвердить код',
    changeNumberButton: 'Изменить номер',
    personalDataTitle: 'Личные данные',
    personalDataDesc: 'Чтобы получить доступ к услугам клиники, укажите основную информацию',
    firstName: 'Имя',
    lastName: 'Фамилия',
    gender: 'Пол',
    male: 'Мужской',
    female: 'Женский',
    birthDate: 'Дата рождения',
    continueButton: 'Продолжить',
    phoneError: 'Введите полный номер телефона'
  },
  uz: {
    title: 'Bemor shaxsiy kabinetiga kirish',
    phoneLabel: 'Telefon raqamingizni kiriting',
    sendSmsButton: 'SMS-kodni yuborish',
    privacyText: '«SMS-kodni yuborish» tugmasini bosish orqali siz',
    privacyLink: 'shaxsiy ma\'lumotlarni qayta ishlashga rozilik',
    smsVerificationText: 'Kelgan SMS-dan 4 ta raqamni kiriting',
    confirmCodeButton: 'Kodni tasdiqlash',
    changeNumberButton: 'Raqamni o\'zgartirish',
    personalDataTitle: 'Shaxsiy ma\'lumotlar',
    personalDataDesc: 'Klinika xizmatlaridan foydalanish uchun asosiy ma\'lumotlarni kiriting',
    firstName: 'Ism',
    lastName: 'Familiya',
    gender: 'Jins',
    male: 'Erkak',
    female: 'Ayol',
    birthDate: 'Tug\'ilgan sana',
    continueButton: 'Davom etish',
    phoneError: 'To\'liq telefon raqamini kiriting'
  }
};

// Login step management
enum LoginStep {
 PHONE_INPUT,
 VERIFICATION_CODE,
 PERSONAL_DATA
}

export default function PatientLogin() {
 const router = useRouter();
  const { theme } = useThemeStore();
   const { currentLocale } = useLanguageStore();
 const { t } = useTranslation(translations);
 const [loginStep, setLoginStep] = useState<LoginStep>(LoginStep.PHONE_INPUT);
 const [phoneNumber, setPhoneNumber] = useState<string>('+998');
 const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '']);
 const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState<boolean>(false);
 const [personalData, setPersonalData] = useState({
   firstName: '',
   lastName: '',
   gender: '',
   birthDate: ''
 });
 
 const genderDropdownRef = useRef<HTMLDivElement>(null);
 const dateInputRef = useRef<HTMLInputElement>(null);
 const dateWrapperRef = useRef<HTMLDivElement>(null);
 
 // Refs for verification code inputs
 const inputRefs = [
   useRef<HTMLInputElement>(null),
   useRef<HTMLInputElement>(null),
   useRef<HTMLInputElement>(null),
   useRef<HTMLInputElement>(null)
 ];

 // Close gender dropdown when clicking outside
 useEffect(() => {
   function handleClickOutside(event: MouseEvent) {
     if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target as Node)) {
       setIsGenderDropdownOpen(false);
     }
   }
   
   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, []);

 // Handle phone number input with formatting
 const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   // Keep the +998 prefix and allow only numbers
   let value = e.target.value;
   if (!value.startsWith('+998')) {
     value = '+998';
   }
   
   // Remove non-digit characters except the plus sign
   const cleaned = value.replace(/[^\d+]/g, '');
   
   // Format the phone number: +998 (__) ___-__-__
   let formatted = cleaned;
   if (cleaned.length > 4) {
     const remainingDigits = cleaned.substring(4);
     formatted = `+998 (${remainingDigits.substring(0, 2)}`;
     
     if (remainingDigits.length > 2) {
       formatted += `) ${remainingDigits.substring(2, 5)}`;
     }
     
     if (remainingDigits.length > 5) {
       formatted += `-${remainingDigits.substring(5, 7)}`;
     }
     
     if (remainingDigits.length > 7) {
       formatted += `-${remainingDigits.substring(7, 9)}`;
     }
   }
   
   setPhoneNumber(formatted);
 };

 // Handle verification code input
 const handleCodeChange = (index: number, value: string) => {
   // Allow only a single digit
   if (value.length > 1) {
     value = value.substring(value.length - 1);
   }
   
   if (!/^\d*$/.test(value)) {
     return;
   }
   
   const newCode = [...verificationCode];
   newCode[index] = value;
   setVerificationCode(newCode);
   
   // Auto-focus next input when digit is entered
   if (value && index < 3) {
     inputRefs[index + 1].current?.focus();
   }
 };

 // Handle backspace in verification code input
 const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
   if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
     inputRefs[index - 1].current?.focus();
   }
 };

 // Update personal data inputs
 const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setPersonalData({
     ...personalData,
     [name]: value
   });
 };

 // Set gender
 const handleGenderSelect = (gender: string) => {
   setPersonalData({
     ...personalData,
     gender
   });
   setIsGenderDropdownOpen(false);
 };

 // Open date picker for both mobile and desktop
 const openDatePicker = () => {
   if (dateInputRef.current) {
     // Use click() instead of showPicker() for better cross-browser compatibility
     dateInputRef.current.click();
   }
 };

 // Send SMS verification code
 const handleSendSMS = () => {
   // Validate phone number - must be full format: +998 (XX) XXX-XX-XX
   // which means it should be at least 19 characters long
   if (phoneNumber.length < 19) {
     alert(t('phoneError'));
     return;
   }
   
   // In a real app, this would call an API to send the SMS
   console.log('Sending SMS to', phoneNumber);
   setLoginStep(LoginStep.VERIFICATION_CODE);
 };

 // Verify SMS code
 const handleVerifyCode = () => {
   // In a real app, this would call an API to verify the code
   const code = verificationCode.join('');
   console.log('Verifying code', code);
   
   // If user has no account yet, go to personal data
   setLoginStep(LoginStep.PERSONAL_DATA);
   
   // If user already exists, would redirect to account page
   // router.push('/account');
 };

 // Submit personal data
 const handleSubmitPersonalData = () => {
   // In a real app, this would call an API to create the account
   console.log('Submitting personal data', personalData);
   
   // Redirect to account page
   router.push('/account');
 };

 // Check if verification code is complete
 const isCodeComplete = verificationCode.every(digit => digit !== '');

 // Check if personal data form is valid
 const isPersonalDataValid = personalData.firstName && 
                             personalData.lastName && 
                             personalData.gender && 
                             personalData.birthDate;

 // Handle "Change number" button
 const handleChangeNumber = () => {
   setLoginStep(LoginStep.PHONE_INPUT);
   setVerificationCode(['', '', '', '']);
 };

 // Display gender selection
 const displayGender = personalData.gender 
   ? (personalData.gender === 'male' ? t('male') : t('female')) 
   : t('gender');
   
 // Format date for display
 const formatDisplayDate = (dateString: string) => {
   if (!dateString) return '';
   const date = new Date(dateString);
   return date.toLocaleDateString(
     // Use the proper locale based on language
     currentLocale === 'uz' ? 'uz-UZ' : 'ru-RU', 
     { day: '2-digit', month: '2-digit', year: 'numeric' }
   );
 };

 return (
   <div className="flex justify-center mt-20 min-h-screen px-4 sm:px-6 py-10">
     <div className="w-full max-w-md sm:max-w-xl">
       {/* Phone Input Step */}
       {loginStep === LoginStep.PHONE_INPUT && (
         <div>
           <div className="flex justify-center mb-4 sm:mb-6">
             <LoginIcon color="#00C78B" size={48} className="sm:w-[60px] sm:h-[60px]" />
           </div>
           
           <h1 className="text-[20px] sm:text-[24px] font-medium text-center text-light-text dark:text-dark-text mb-4 sm:mb-5">
             {t('title')}
           </h1>
           
           <div className="mb-6 sm:mb-8">
             <p className="text-[14px] text-light-text dark:text-dark-text mb-2 sm:mb-3">
               {t('phoneLabel')}
             </p>
             <input
               type="tel"
               inputMode="tel"
               value={phoneNumber}
               onChange={handlePhoneChange}
               placeholder="+998 (__) ___-__-__"
               className="w-full p-4 sm:p-5 bg-white dark:bg-dark-block border border-[#E5E7EB] dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-light-accent text-light-text dark:text-dark-text text-base sm:text-lg"
             />
             {phoneNumber.length > 4 && phoneNumber.length < 19 && (
               <p className="text-red-500 text-xs mt-1">{t('phoneError')}</p>
             )}
           </div>
           
           <button
             onClick={handleSendSMS}
             disabled={phoneNumber.length < 19}
             className="w-full py-4 sm:py-5 rounded-2xl bg-light-accent text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed text-[16px] sm:text-[18px]"
           >
             {t('sendSmsButton')}
           </button>
           
           <p className="text-xs text-light-text/70 dark:text-dark-text/70 mt-3 sm:mt-4 text-center">
             {t('privacyText')}<br />
             <Link href="/privacy" className="text-light-accent">{t('privacyLink')}</Link>
           </p>
         </div>
       )}
       
       {/* Verification Code Step */}
       {loginStep === LoginStep.VERIFICATION_CODE && (
         <div>
           <div className="flex justify-center mb-4 sm:mb-6">
             <LoginIcon color="#00C78B" size={48} className="sm:w-[60px] sm:h-[60px]" />
           </div>
           
           <h1 className="text-[20px] sm:text-[24px] font-medium text-center text-light-text dark:text-dark-text mb-4 sm:mb-5">
             {t('title')}
           </h1>
           
           <p className="text-[14px] text-light-text dark:text-dark-text text-center mb-4 sm:mb-6">
             {t('smsVerificationText')}
           </p>
           
           <div className="flex justify-between gap-2 sm:gap-3 mb-6 sm:mb-8">
             {[0, 1, 2, 3].map((index) => (
               <input
                 key={index}
                 ref={inputRefs[index]}
                 type="text"
                 inputMode="numeric"
                 value={verificationCode[index]}
                 onChange={(e) => handleCodeChange(index, e.target.value)}
                 onKeyDown={(e) => handleKeyDown(index, e)}
                 maxLength={1}
                 className="w-16 h-16 sm:w-24 sm:h-24 text-center text-2xl sm:text-3xl bg-white dark:bg-dark-block border border-[#E5E7EB] dark:border-gray-700 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-light-accent text-light-text dark:text-dark-text"
               />
             ))}
           </div>
           
           <button
             onClick={handleVerifyCode}
             disabled={!isCodeComplete}
             className="w-full py-4 sm:py-5 rounded-2xl bg-light-accent text-white font-medium mb-4 sm:mb-5 disabled:opacity-50 disabled:cursor-not-allowed text-[16px] sm:text-[18px]"
           >
             {t('confirmCodeButton')}
           </button>
           
           <button
            onClick={handleChangeNumber}
             className="w-full text-center text-light-accent text-[16px] sm:text-[18px]"
           >
             {t('changeNumberButton')}
           </button>
         </div>
       )}
       
       {/* Personal Data Step */}
       {loginStep === LoginStep.PERSONAL_DATA && (
         <div>
           <h1 className="text-[20px] sm:text-[24px] font-medium text-center text-light-text dark:text-dark-text mb-2 sm:mb-3">
             {t('personalDataTitle')}
           </h1>
           
           <p className="text-[14px] text-light-text/70 dark:text-dark-text/70 text-center mb-6 sm:mb-8">
             {t('personalDataDesc')}
           </p>
           
           <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
             <input
               type="text"
               name="firstName"
               value={personalData.firstName}
               onChange={handlePersonalDataChange}
               placeholder={t('firstName')}
               className="w-full p-4 sm:p-5 bg-white dark:bg-dark-block border border-[#E5E7EB] dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-light-accent text-light-text dark:text-dark-text text-base sm:text-lg"
             />
             
             <input
               type="text"
               name="lastName"
               value={personalData.lastName}
               onChange={handlePersonalDataChange}
               placeholder={t('lastName')}
               className="w-full p-4 sm:p-5 bg-white dark:bg-dark-block border border-[#E5E7EB] dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-light-accent text-light-text dark:text-dark-text text-base sm:text-lg"
             />
             
             {/* Custom Gender Dropdown */}
             <div className="relative" ref={genderDropdownRef}>
               <div 
                 className="w-full p-4 sm:p-5 bg-white dark:bg-dark-block border border-[#E5E7EB] dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-light-accent text-light-text dark:text-dark-text text-base sm:text-lg flex justify-between items-center cursor-pointer"
                 onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
               >
                 <span className={personalData.gender ? 'text-light-text dark:text-dark-text' : 'text-light-text/60 dark:text-dark-text/60'}>
                   {displayGender}
                 </span>
                 <svg 
                   width="16" 
                   height="16" 
                   viewBox="0 0 24 24" 
                   fill="none"
                   className={`transition-transform ${isGenderDropdownOpen ? 'rotate-180' : ''}`}
                 >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               
               {isGenderDropdownOpen && (
                 <div className="absolute z-10 mt-1 w-full bg-white dark:bg-dark-block border border-[#E5E7EB] dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden">
                   <div 
                     className="p-4 sm:p-5 hover:bg-light-accent/10 cursor-pointer text-light-text dark:text-dark-text"
                     onClick={() => handleGenderSelect('male')}
                   >
                     {t('male')}
                   </div>
                   <div 
                     className="p-4 sm:p-5 hover:bg-light-accent/10 cursor-pointer text-light-text dark:text-dark-text"
                     onClick={() => handleGenderSelect('female')}
                   >
                     {t('female')}
                   </div>
                 </div>
               )}
             </div>
             
             {/* Date Input - Improved for Mobile */}
             <div className="relative" ref={dateWrapperRef}>
               <div 
                 className="w-full p-4 sm:p-5 bg-white dark:bg-dark-block border border-[#E5E7EB] dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-light-accent text-light-text dark:text-dark-text text-base sm:text-lg flex justify-between items-center cursor-pointer"
                 onClick={openDatePicker}
               >
                 <span className={personalData.birthDate ? 'text-light-text dark:text-dark-text' : 'text-light-text/60 dark:text-dark-text/60'}>
                   {personalData.birthDate ? formatDisplayDate(personalData.birthDate) : t('birthDate')}
                 </span>
                 <svg 
                   width="24" 
                   height="24" 
                   viewBox="0 0 24 24" 
                   fill="none"
                   stroke="currentColor"
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 >
                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                   <line x1="16" y1="2" x2="16" y2="6" />
                   <line x1="8" y1="2" x2="8" y2="6" />
                   <line x1="3" y1="10" x2="21" y2="10" />
                 </svg>
               </div>
               <input
                 ref={dateInputRef}
                 type="date"
                 name="birthDate"
                 value={personalData.birthDate}
                 onChange={handlePersonalDataChange}
                 className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                 max={new Date().toISOString().split('T')[0]} // Prevent future dates
               />
             </div>
           </div>
           
           <button
             onClick={handleSubmitPersonalData}
             disabled={!isPersonalDataValid}
             className="w-full py-4 sm:py-5 rounded-2xl bg-light-accent text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed text-[16px] sm:text-[18px]"
           >
             {t('continueButton')}
           </button>
         </div>
       )}
     </div>
   </div>
 );
}