import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";
import AiAssistant from "@/components/AiAssistant";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <NewsletterPopup />
      <AiAssistant />
    </>
  );
}
