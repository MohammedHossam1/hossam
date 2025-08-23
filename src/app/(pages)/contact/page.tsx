import ContactForm from "@/components/layout/contact"
import SectionHeader from "@/components/shared/section-header"

const ContactPage = () => {



  return (
    <section className="z-2 py-5 lg:py-10  min-h-[100dvh]  relative">
      <SectionHeader title="Get in Touch" />
      <ContactForm />
    </section>
  )
}

export default ContactPage