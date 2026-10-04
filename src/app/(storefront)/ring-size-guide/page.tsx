"use client";

import Link from "next/link";
import { useState } from "react";

const sizeChart = [
  { us: "4", uk: "H", eu: "46.5", diameter: "14.9 mm", circumference: "46.8 mm" },
  { us: "4.5", uk: "I", eu: "48", diameter: "15.3 mm", circumference: "48.0 mm" },
  { us: "5", uk: "J 1/2", eu: "49.5", diameter: "15.7 mm", circumference: "49.3 mm" },
  { us: "5.5", uk: "K 1/2", eu: "50.5", diameter: "16.1 mm", circumference: "50.6 mm" },
  { us: "6", uk: "L 1/2", eu: "52", diameter: "16.5 mm", circumference: "51.9 mm" },
  { us: "6.5", uk: "M 1/2", eu: "53.5", diameter: "16.9 mm", circumference: "53.1 mm" },
  { us: "7", uk: "N 1/2", eu: "54.5", diameter: "17.3 mm", circumference: "54.4 mm" },
  { us: "7.5", uk: "O 1/2", eu: "56", diameter: "17.7 mm", circumference: "55.7 mm" },
  { us: "8", uk: "P 1/2", eu: "57", diameter: "18.1 mm", circumference: "57.0 mm" },
  { us: "8.5", uk: "Q 1/2", eu: "58.5", diameter: "18.5 mm", circumference: "58.3 mm" },
  { us: "9", uk: "R 1/2", eu: "59.5", diameter: "19.0 mm", circumference: "59.5 mm" },
];

export default function RingSizeGuidePage() {
  const [selectedStandard, setSelectedStandard] = useState<"US" | "UK" | "EU">("US");

  return (
    <div style={{ background: "var(--clr-bg)", minHeight: "90vh", padding: "60px 0 100px" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--clr-accent)", fontWeight: 600 }}>
            Precision Fit Guarantee
          </span>
          <h1 style={{ fontSize: "36px", fontWeight: 300, margin: "12px 0 16px" }}>
            The Atelier Ring Size Guide
          </h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            Every Lumière ring is custom-cast to your exact measurement. We provide one complimentary re-sizing within 60 days of delivery.
          </p>
        </div>

        {/* 3 Methods */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "56px" }} className="guide-methods">
          <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "28px" }}>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>📏</div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>Method 1: Measure a Ring</h3>
            <p style={{ fontSize: "13px", color: "var(--clr-text-muted)", lineHeight: 1.5 }}>
              Take an existing ring that fits the intended finger well. Use a ruler to measure the inside diameter in millimeters at the widest point.
            </p>
          </div>

          <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "28px" }}>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>🧵</div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>Method 2: Ribbon Test</h3>
            <p style={{ fontSize: "13px", color: "var(--clr-text-muted)", lineHeight: 1.5 }}>
              Wrap a piece of string or ribbon snugly around the base of the finger. Mark where the ends meet and measure the length against a millimeter scale.
            </p>
          </div>

          <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "28px" }}>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>🤫</div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>Secret Proposal?</h3>
            <p style={{ fontSize: "13px", color: "var(--clr-text-muted)", lineHeight: 1.5 }}>
              Average women’s ring size is US 6 to 6.5. If in doubt, select US 6.5 — our atelier can resize the ring after your proposal at no cost.
            </p>
          </div>
        </div>

        {/* Size Conversion Table */}
        <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "48px" }}>
          <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--clr-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 500 }}>International Conversion Matrix</h2>
              <p style={{ fontSize: "12px", color: "var(--clr-text-muted)" }}>US, UK, and European millimeter standards</p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {(["US", "UK", "EU"] as const).map((std) => (
                <button
                  key={std}
                  type="button"
                  onClick={() => setSelectedStandard(std)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "100px",
                    border: `1px solid ${selectedStandard === std ? "var(--clr-accent)" : "var(--clr-border)"}`,
                    background: selectedStandard === std ? "var(--clr-bg-dark)" : "#fff",
                    color: selectedStandard === std ? "#fff" : "var(--clr-text)",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Highlight {std}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "var(--clr-bg)", borderBottom: "1px solid var(--clr-border)" }}>
                  <th style={{ padding: "14px 20px", fontWeight: 600 }}>US Size</th>
                  <th style={{ padding: "14px 20px", fontWeight: 600 }}>UK & AU</th>
                  <th style={{ padding: "14px 20px", fontWeight: 600 }}>European</th>
                  <th style={{ padding: "14px 20px", fontWeight: 600 }}>Inside Diameter</th>
                  <th style={{ padding: "14px 20px", fontWeight: 600 }}>Circumference</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid var(--clr-border-light)",
                      background: idx % 2 === 0 ? "#fff" : "rgba(250, 249, 247, 0.5)",
                    }}
                  >
                    <td style={{ padding: "14px 20px", fontWeight: selectedStandard === "US" ? 700 : 400, color: selectedStandard === "US" ? "var(--clr-accent)" : "inherit" }}>
                      {row.us}
                    </td>
                    <td style={{ padding: "14px 20px", fontWeight: selectedStandard === "UK" ? 700 : 400, color: selectedStandard === "UK" ? "var(--clr-accent)" : "inherit" }}>
                      {row.uk}
                    </td>
                    <td style={{ padding: "14px 20px", fontWeight: selectedStandard === "EU" ? 700 : 400, color: selectedStandard === "EU" ? "var(--clr-accent)" : "inherit" }}>
                      {row.eu}
                    </td>
                    <td style={{ padding: "14px 20px", color: "var(--clr-text-muted)" }}>{row.diameter}</td>
                    <td style={{ padding: "14px 20px", color: "var(--clr-text-muted)" }}>{row.circumference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to action */}
        <div
          style={{
            background: "var(--clr-bg-dark)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            padding: "48px 36px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: 300, color: "#fff", marginBottom: "12px" }}>
            Still unsure about the sizing?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", maxWidth: "540px", margin: "0 auto 28px" }}>
            Order our complimentary home sizing gauge kit delivered to your doorstep in 48 hours, or speak live with our gemologist.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn" style={{ background: "var(--clr-gold)", color: "var(--clr-bg-dark)", padding: "12px 24px" }}>
              Request Complimentary Sizing Kit
            </Link>
            <Link href="/collections/engagement-rings" className="btn btn-secondary" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)", padding: "12px 24px" }}>
              Browse Engagement Rings
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .guide-methods {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
