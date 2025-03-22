import ComprehensiveApproach from "@/src/shared/components/ComprehensiveApproach";
import ContactForm from "@/src/shared/components/ContactForm";
import { ContactInfo } from "@/src/shared/components/ContactInfo";
import PartnerBenefits from "@/src/shared/components/PartnerBenefits";
import WhyChooseUs from "@/src/shared/components/WhyChooseUs";

export default function Partners() {
  return (
    <main>
      <PartnerBenefits />
      <ComprehensiveApproach />
      <WhyChooseUs />
      <ContactForm />
       <ContactInfo />
    </main>
  );
}