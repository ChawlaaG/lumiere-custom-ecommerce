"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "How do I know my ring size before ordering?",
    a: "You can consult our comprehensive Ring Size Guide, measure an existing ring's inner diameter, or request our complimentary home sizing gauge kit. We also provide one free re-sizing within 60 days.",
  },
  {
    q: "Are your diamonds certified by independent gemological laboratories?",
    a: "Yes. Every diamond weighing 0.30 carats or larger comes with an individual grading report from either the Gemological Institute of America (GIA) or the International Gemological Institute (IGI).",
  },
  {
    q: "What is your shipping time and return policy?",
    a: "In-stock items ship within 24 hours via insured express air courier. Custom-crafted bridal rings ship in 7–10 business days. We offer a 30-day return or exchange policy on all unworn catalog pieces in original packaging.",
  },
  {
    q: "Can I customize a design with different metals or stone shapes?",
    a: "Absolutely. Our bespoke team can craft any ring in 14k or 18k yellow, white, or rose gold, or 950 platinum, with oval, round, emerald, pear, or cushion cut diamonds.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", reason: "Appointment", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "var(--clr-bg)", minHeight: "90vh", padding: "60px 0 100px" }}>
      <div className="container" style={{ maxWidth: "1050px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--clr-accent)", fontWeight: 600 }}>
            We are at your service
          </span>
          <h1 style={{ fontSize: "36px", fontWeight: 300, margin: "12px 0 16px" }}>
            Contact the Atelier Concierge
          </h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "16px", maxWidth: "580px", margin: "0 auto" }}>
            Whether you are curating a custom bridal creation, inquiring about an order, or booking a private viewing, our gemologists are delighted to assist.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", marginBottom: "80px" }} className="contact-grid">
          {/* Left: Contact Form */}
          <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "36px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(74, 140, 111, 0.15)", color: "var(--clr-success)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", margin: "0 auto 20px" }}>
                  ✓
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 400, marginBottom: "8px" }}>Message Received</h3>
                <p style={{ color: "var(--clr-text-muted)", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>
                  Thank you, {formData.name}. Our master gemologist will review your inquiry and connect via {formData.email} within 2 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary"
                  style={{ padding: "10px 20px", fontSize: "13px" }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 500 }}>Send Us a Message</h2>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Aditya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="aditya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98201 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Inquiry Type</label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "#fff" }}
                  >
                    <option value="Appointment">Book Private Atelier Viewing</option>
                    <option value="Custom">Custom Engagement Ring Design</option>
                    <option value="Order">Order Tracking & Status Inquiry</option>
                    <option value="Resizing">Ring Sizing / Repair</option>
                    <option value="General">Other General Questions</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the diamond carat, metal preference, or order details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: "14px", fontSize: "14px", marginTop: "4px" }}>
                  Submit Inquiry to Concierge
                </button>
              </form>
            )}
          </div>

          {/* Right: Atelier Locations & Direct channels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Showrooms */}
            <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "28px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Atelier Showrooms</h3>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--clr-text)" }}>Mumbai Private Atelier</div>
                <div style={{ fontSize: "13px", color: "var(--clr-text-muted)", marginTop: "4px" }}>
                  Level 8, The Signature Tower, Bandra Kurla Complex (BKC)<br />
                  Mumbai, Maharashtra 400051<br />
                  Hours: Tuesday – Sunday, 11:00 AM – 7:30 PM (By Appointment)
                </div>
              </div>

              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--clr-text)" }}>Flagship Workshop</div>
                <div style={{ fontSize: "13px", color: "var(--clr-text-muted)", marginTop: "4px" }}>
                  Rue Saint-Jacques, Old Montreal<br />
                  QC H2Y 1L3, Canada
                </div>
              </div>
            </div>

            {/* Instant Contact */}
            <div style={{ background: "var(--clr-bg-dark)", color: "#fff", borderRadius: "var(--radius-md)", padding: "28px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "12px" }}>Instant WhatsApp Concierge</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: 1.5, marginBottom: "20px" }}>
                Need immediate answers regarding carat weights, video consultations, or delivery dates? Message our certified gemologist directly.
              </p>
              <a
                href="https://wa.me/919820100000?text=Hello%20Lumiere%20Atelier,%20I%20would%20like%20to%20inquire%20about%20fine%20jewelry."
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#25D366",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "40px 32px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 400, textAlign: "center", marginBottom: "32px" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px", margin: "0 auto" }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid var(--clr-border-light)",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    background: openFaq === idx ? "var(--clr-bg)" : "#fff",
                    border: "none",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "var(--clr-text)",
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: "18px", color: "var(--clr-accent)" }}>
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: "16px 20px", fontSize: "14px", color: "var(--clr-text-muted)", lineHeight: 1.6, background: "#fff", borderTop: "1px solid var(--clr-border-light)" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
