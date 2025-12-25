// src/shared/components/PartnerBenefits.tsx
"use client";

import { useLanguageStore } from "@/src/store/language";
import { usePartnersStore } from "@/src/store/partners";
import { useThemeStore } from "@/src/store/theme";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MedicalSearchIcon, RatingStarIcon } from "../ui/Icon";

export default function PartnerBenefits() {
	const { theme } = useThemeStore();
	const { currentLocale } = useLanguageStore();
	const [screenSize, setScreenSize] = useState("desktop");

	// Используем наш новый стор
	const { fetchPartners, loading, error, getMainPartner, getBenefitCards } = usePartnersStore();

	// Получаем данные из стора
	const mainItem = getMainPartner();
	const benefitCards = getBenefitCards();

	// // Загрузка данных при монтировании компонента
	// useEffect(() => {
	//   fetchPartners(currentLocale);
	// }, [currentLocale]);

	// Enhanced screen size detection
	useEffect(() => {
		const checkScreenSize = () => {
			const width = window.innerWidth;
			if (width < 768) {
				setScreenSize("mobile");
			} else if (width < 1024) {
				setScreenSize("tablet");
			} else if (width < 1520) {
				setScreenSize("laptop");
			} else {
				setScreenSize("desktop");
			}
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const isMobile = screenSize === "mobile";
	const isTablet = screenSize === "tablet";
	const isLaptop = screenSize === "laptop";

	// Отображение загрузки
	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent" />
			</div>
		);
	}

	// Отображение ошибки
	if (error) {
		return (
			<div className="container max-w-8xl mx-auto px-4 md:px-6 py-16">
				<div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
					<p className="text-red-600 dark:text-red-100">
						Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.
					</p>
				</div>
			</div>
		);
	}

	// Dynamic sizing based on screen size
	const getMinHeight = () => {
		if (isMobile) return "min-h-[250px] h-full";
		if (isTablet) return "min-h-[300px] h-full";
		if (isLaptop) return "min-h-[350px] h-full";
		return "min-h-[450px] h-full";
	};

	// Функция для рендера SVG из строки
	const renderSvg = (svgString: string | null) => {
		if (!svgString) return null;
		return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
	};

	// Компонент FeatureCard с возможностью принимать SVG
	const FeatureCard = ({
		title,
		description,
		svgString,
		greenOnLoad = false,
	}: {
		title: string;
		description: string;
		svgString?: string | null;
		greenOnLoad?: boolean;
	}) => {
		const [hover, setHover] = useState(greenOnLoad);

		// Рендер SVG с учетом темы и состояния наведения
		const icon = svgString ? (
			<div
				className={`flex justify-center items-center transition-all duration-300`}
				dangerouslySetInnerHTML={{
					__html: svgString.replace(
						/fill="[^"]*"/g,
						hover ? 'fill="#FFFFFF"' : theme === "light" ? 'fill="#094A54"' : 'fill="#FFFFFF"',
					),
				}}
			/>
		) : null;

		return (
			<div
				className={`p-5 md:p-6 lg:p-8 xl:p-8 rounded-2xl transition-all duration-300 h-full ${getMinHeight()} ${
					hover
						? "bg-light-accent text-white"
						: theme === "light"
						? "bg-white text-light-text"
						: "bg-dark-block text-dark-text"
				}`}
				onMouseEnter={() => !isMobile && setHover(true)}
				onMouseLeave={() => !isMobile && !greenOnLoad && setHover(false)}
				onClick={() => isMobile && setHover(!hover)}
			>
				<div className="flex flex-col h-full justify-between">
					<h3 className={`text-xl md:text-[22px] lg:text-[24px] font-medium ${isMobile ? "mb-3" : "mb-4"}`}>{title}</h3>
					{icon && (
						<div
							className={`${
								isMobile ? "my-6" : isTablet ? "my-8" : isLaptop ? "my-10" : "my-[90px]"
							} transition-all flex justify-center`}
						>
							{icon}
						</div>
					)}
					<p className="text-sm md:text-base lg:text-lg xl:text-[18px]">{description}</p>
				</div>
			</div>
		);
	};

	const getBannerHeight = () => {
		if (isMobile) return "h-[250px]";
		if (isTablet) return "h-[300px]";
		if (isLaptop) return "h-[400px]";
		return "h-[500px]";
	};

	// Иконки по умолчанию
	const defaultIcons = [<RatingStarIcon key="rating" />, <MedicalSearchIcon key="search" />];

	return (
		<div>
			{/* Большое фото сверху с адаптивной высотой */}
			<div className={`w-full ${getBannerHeight()} relative rounded-2xl overflow-hidden mb-6`}>
				<Image
					src="/images/health-insurance.jpg"
					alt="Медицинская страховка"
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1520px) 100vw, 100vw"
					priority
				/>
			</div>

			{/* Блоки с изменением расположения и размеров */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mt-8 mb-40">
				{/* Левый блок - информация о программах (адаптивный размер колонок) */}
				<div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
					<div
						className={`h-full ${getMinHeight()} p-5 md:p-6 lg:p-8 rounded-2xl bg-white dark:bg-dark-block flex flex-col justify-between`}
					>
						<h3 className="text-xl md:text-2xl lg:text-3xl xl:text-[38px] leading-[1.2] font-medium mb-3 md:mb-4 text-light-text dark:text-dark-text">
							{mainItem?.title || "Защитите здоровье сотрудников с выгодными программами медицинского обслуживания"}
						</h3>
						<p className="text-sm md:text-base lg:text-lg xl:text-[18px] text-light-text dark:text-dark-text">
							{mainItem?.subtitle ||
								"Клиника Global Med предлагает комплексные решения корпоративного медицинского обслуживания, позволяющие создать благоприятную и безопасную рабочую среду, снизить количество больничных и повысить производительность труда"}
						</p>
					</div>
				</div>

				{/* Карточки партнеров на основе данных из API */}
				{benefitCards.map((item, index) => (
					<div key={index} className="col-span-1">
						<div className={getMinHeight()}>
							<FeatureCard title={item.title} description={item.subtitle} svgString={item.svg || undefined} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
