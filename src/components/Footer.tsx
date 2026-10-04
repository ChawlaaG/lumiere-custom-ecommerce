"use client";

import Link from "next/link";

const footerLinks = {
  Shop: [
    { href: "/collections/engagement-rings", label: "Engagement Rings" },
    { href: "/collections/wedding-bands", label: "Wedding Bands" },
    { href: "/collections/necklaces", label: "Necklaces" },
    { href: "/collections/earrings", label: "Earrings" },
    { href: "/collections/bracelets", label: "Bracelets" },
  ],
  About: [
    { href: "/about", label: "Our Story" },
    { href: "/about#sustainability", label: "Sustainability" },
    { href: "/about#craftsmanship", label: "Craftsmanship" },
    { href: "/about#lab-diamonds", label: "Lab-Grown Diamonds" },
  ],
  Help: [
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/ring-size-guide", label: "Ring Size Guide" },
    { href: "/care", label: "Jewelry Care" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--clr-bg-dark)",
        color: "var(--clr-text-inverse)",
        padding: "80px 0 40px",
      }}
    >
      <div className="container">
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(3, 1fr)",
            gap: "48px",
            marginBottom: "60px",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                fontSize: "28px",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "white",
                display: "block",
                marginBottom: "20px",
              }}
            >
              Lumière
            </Link>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                maxWidth: "280px",
                marginBottom: "24px",
              }}
            >
              Ethically sourced, lab-grown diamond jewelry — handcrafted in 18K gold and platinum.
              Every piece tells a story of love, integrity, and timeless design.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {["Instagram", "Facebook", "Pinterest"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "12px",
                    transition: "all 200ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "20px",
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.65)",
                        transition: "color 200ms",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "32px" }} />

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
            © 2024 Lumière Jewelry. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((text) => (
              <a
                key={text}
                href="#"
                style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", transition: "color 200ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
