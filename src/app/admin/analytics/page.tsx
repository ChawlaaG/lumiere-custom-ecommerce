"use client";

import { useState } from "react";
import { formatPrice } from "@/data/products";

const categoriesShare = [
  { name: "Engagement Rings", share: 48, revenue: 2056992, count: 88, color: "#b69d74" },
  { name: "Wedding Bands", share: 22, revenue: 942788, count: 62, color: "#1e293b" },
  { name: "Necklaces & Pendants", share: 16, revenue: 685664, count: 34, color: "#64748b" },
  { name: "Earrings & Studs", share: 14, revenue: 599956, count: 42, color: "#94a3b8" },
];

const funnelData = [
  { stage: "Storefront Visitors", count: 14200, percent: "100%" },
  { stage: "Product Page (PDP) Views", count: 8450, percent: "59.5%" },
  { stage: "Added to Shopping Bag", count: 2180, percent: "15.3%" },
  { stage: "Initiated Express Checkout", count: 920, percent: "6.5%" },
  { stage: "Completed Paid Orders", count: 546, percent: "3.84%" },
];

export default function AdminAnalyticsPage() {
  const [reportPeriod, setReportPeriod] = useState("oct-2024");

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Business Analytics & Sales Intelligence</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Comprehensive performance metrics, conversion funnels, and category sales attribution
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            style={{
              padding: "8px 12px",
              background: "#fff",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <option value="oct-2024">October 2024 (Month to Date)</option>
            <option value="q3-2024">Q3 2024 (Jul - Sep)</option>
            <option value="fy-2024">Fiscal Year 2024</option>
          </select>

          <button
            type="button"
            onClick={() => alert("Generating Executive PDF Performance Dossier...")}
            style={{
              padding: "8px 16px",
              background: "#0f172a",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            📥 Download Executive PDF
          </button>
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "28px" }} className="analytics-summary">
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px" }}>
          <div style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Total Net Jewelry Revenue</div>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a", margin: "8px 0" }}>₹42,85,400</div>
          <div style={{ fontSize: "12px", color: "#16a34a" }}>↑ 18.4% compared to previous quarter</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px" }}>
          <div style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>GST 3% Tax Collected</div>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a", margin: "8px 0" }}>₹1,28,562</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Ready for automated GSTR-1 filing</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px" }}>
          <div style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Returning Client Rate</div>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a", margin: "8px 0" }}>34.2%</div>
          <div style={{ fontSize: "12px", color: "#16a34a" }}>↑ 4.1% bridal anniversary repeat orders</div>
        </div>
      </div>

      {/* Category Share & Funnel Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "24px", marginBottom: "28px" }} className="analytics-grid">
        {/* Category Contribution */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Sales by Jewelry Category</h2>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>Revenue share across collections</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {categoriesShare.map((cat, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>{cat.name} ({cat.share}%)</span>
                  <span style={{ fontWeight: 700, color: "#334155" }}>{formatPrice(cat.revenue)}</span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "100px", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${cat.share}%`,
                      height: "100%",
                      background: cat.color,
                      borderRadius: "100px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>E-Commerce Conversion Funnel</h2>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>End-to-end drop-off analysis</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {funnelData.map((f, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{f.stage}</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{f.count.toLocaleString()} sessions</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ background: idx === funnelData.length - 1 ? "#dcfce7" : "#e2e8f0", color: idx === funnelData.length - 1 ? "#15803d" : "#475569", fontWeight: 700, fontSize: "12px", padding: "3px 8px", borderRadius: "6px" }}>
                    {f.percent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .analytics-summary, .analytics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
