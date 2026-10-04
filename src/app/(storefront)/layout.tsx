import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";
import AiAssistant from "@/components/AiAssistant";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <NewsletterPopup />
      <AiAssistant />
      <CartDrawer />
    </CartProvider>
  );
}
