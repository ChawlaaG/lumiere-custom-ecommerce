"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--clr-bg)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          padding: "100px 0 80px",
          background: "var(--clr-bg-dark)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "800px" }}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--clr-gold)", fontWeight: 600, display: "block", marginBottom: "16px" }}>
            The Lumière Atelier
          </span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 200, letterSpacing: "-0.03em", marginBottom: "24px", color: "#fff" }}>
            Fine Jewelry Crafted with Uncompromising Integrity
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, fontWeight: 300 }}>
            Founded on the belief that true luxury must honor both human devotion and the earth, every Lumière creation is individually handcrafted using 100% recycled precious metals and ethically verified diamonds.
          </p>
        </div>
      </section>

      {/* 3 Pillars */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }} className="about-pillars">
            <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "36px" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>🌿</div>
              <h2 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "12px" }}>100% Recycled Gold</h2>
              <p style={{ color: "var(--clr-text-muted)", fontSize: "14px", lineHeight: 1.6 }}>
                Mining for new gold scars the landscape and produces toxic runoff. By exclusively refining existing post-consumer precious metals, our carbon footprint is reduced by over 98% without sacrificing purity or sheen.
              </p>
            </div>

            <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "36px" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>💎</div>
              <h2 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "12px" }}>Ethical & Lab Diamonds</h2>
              <p style={{ color: "var(--clr-text-muted)", fontSize: "14px", lineHeight: 1.6 }}>
                Every stone in our collection is conflict-free and strictly compliant with the Kimberley Process or grown via clean-energy solar CVD reactors. Each diamond comes with independent IGI or GIA grading documentation.
              </p>
            </div>

            <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "36px" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>⚒️</div>
              <h2 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "12px" }}>Artisanal Handcrafting</h2>
              <p style={{ color: "var(--clr-text-muted)", fontSize: "14px", lineHeight: 1.6 }}>
                We reject mass industrial stamping. Our master jewelers individually cast, set, and polish every curve. This dedication ensures your piece is structurally resilient and passed down through generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Banner */}
      <section style={{ padding: "80px 0", background: "var(--clr-bg-alt)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="about-split">
            <div style={{ height: "420px", position: "relative", borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <Image src="/images/hero-ring.jpg" alt="Artisanal Diamond Crafting" fill style={{ objectFit: "cover" }} />
            </div>
            <div>
              <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--clr-accent)", fontWeight: 600 }}>
                Lifetime Atelier Promise
              </span>
              <h2 style={{ fontSize: "32px", fontWeight: 300, margin: "12px 0 20px" }}>
                Designed to Be Loved for a Lifetime
              </h2>
              <p style={{ color: "var(--clr-text-muted)", fontSize: "15px", lineHeight: 1.7, marginBottom: "20px" }}>
                When you invest in a Lumière piece, our relationship has just begun. Every engagement ring and bridal band includes:
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", marginBottom: "32px" }}>
                <li style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--clr-success)" }}>✓</span> Complimentary annual prong inspection & sonic steam cleaning
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--clr-success)" }}>✓</span> Free ring re-sizing within 60 days
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--clr-success)" }}>✓</span> Lifetime craftsmanship warranty against manufacturing defects
                </li>
                <li style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--clr-success)" }}>✓</span> Official Certificate of Authenticity with unique serial hallmark
                </li>
              </ul>
              <Link href="/collections/engagement-rings" className="btn btn-primary" style={{ padding: "14px 28px" }}>
                Explore the Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 800px) {
          .about-pillars, .about-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
