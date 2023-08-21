import ContactFormB from "@/components/ContactFormB";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="my-[15vh]">
        <ContactFormB />
      </div>
      <Footer />
    </>
  );
}
