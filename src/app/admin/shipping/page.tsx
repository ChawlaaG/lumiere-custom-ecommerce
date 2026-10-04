"use client";

import { useState } from "react";
import { formatPrice } from "@/data/products";

interface Shipment {
  awb: string;
  orderId: string;
  customer: string;
  city: string;
  courier: string;
  status: "In Transit" | "Out for Delivery" | "Delivered" | "Manifest Created";
  dispatchedDate: string;
  estDelivery: string;
  insurance: "100% Covered" | "Pending";
  value: number;
}

const initialShipments: Shipment[] = [
  { awb: "BD-882910482IN", orderId: "ECK-2024-8849", customer: "Aditya Sharma", city: "Mumbai, MH", courier: "BlueDart Secure Air", status: "In Transit", dispatchedDate: "Today, 10:00 AM", estDelivery: "Oct 06, 2024", insurance: "100% Covered", value: 127000 },
  { awb: "BD-771920831IN", orderId: "ECK-2024-8846", customer: "Sneha Nair", city: "Kochi, KL", courier: "BlueDart Secure Air", status: "Delivered", dispatchedDate: "Sep 30, 2024", estDelivery: "Oct 02, 2024", insurance: "100% Covered", value: 48000 },
  { awb: "SE-991204881IN", orderId: "ECK-2024-8842", customer: "Vikram Singhania", city: "Hyderabad, TS", courier: "Sequel Armored Logistics", status: "Delivered", dispatchedDate: "Sep 28, 2024", estDelivery: "Sep 30, 2024", insurance: "100% Covered", value: 380000 },
  { awb: "DL-441029381IN", orderId: "ECK-2024-8840", customer: "Ananya Desai", city: "Pune, MH", courier: "Delhivery Surface Express", status: "Delivered", dispatchedDate: "Sep 26, 2024", estDelivery: "Sep 28, 2024", insurance: "100% Covered", value: 35000 },
];

export default function AdminShippingPage() {
  const [shipments] = useState<Shipment[]>(initialShipments);
  const [testPincode, setTestPincode] = useState("400001");
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    setPincodeResult(`Pincode ${testPincode} is serviceable for Insured Next-Day Air Delivery via BlueDart.`);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Shiprocket & BlueDart Webhook Sync completed! All tracking states updated.");
    }, 1000);
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Shiprocket & Armored Logistics</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Automated courier dispatch, AWB generation, transit insurance, and real-time delivery webhooks
          </p>
        </div>

        <button
          type="button"
          onClick={handleSync}
          disabled={isSyncing}
          style={{
            padding: "9px 18px",
            background: "#0284c7",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {isSyncing ? "Syncing API..." : "🔄 Sync Courier Webhooks"}
        </button>
      </div>

      {/* 3 Courier Partner Status Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "28px" }} className="shipping-carriers">
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>BlueDart Secure Air</span>
            <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>Connected</span>
          </div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Primary partner for fine jewelry up to ₹2,00,000</div>
          <div style={{ fontSize: "11px", color: "#16a34a", marginTop: "8px" }}>✓ Auto-manifest & Pickup Scheduled Daily at 4 PM</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>Sequel Armored Logistics</span>
            <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>Active</span>
          </div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>High-Value bullion & bespoke bridal sets above ₹2 Lakhs</div>
          <div style={{ fontSize: "11px", color: "#16a34a", marginTop: "8px" }}>✓ Armed guard escort & vault custody</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>Shiprocket Multi-Carrier</span>
            <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>API Live</span>
          </div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Automated rate comparison across 18,000+ Indian PIN codes</div>
          <div style={{ fontSize: "11px", color: "#16a34a", marginTop: "8px" }}>✓ Instant WhatsApp delivery updates to buyers</div>
        </div>
      </div>

      {/* Pincode Lookup Tool */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px", marginBottom: "28px" }}>
        <form onSubmit={checkPincode} style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#334155" }}>
            Test PIN Code Serviceability:
          </label>
          <input
            type="text"
            placeholder="e.g. 400001, 110001"
            value={testPincode}
            onChange={(e) => setTestPincode(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", width: "160px" }}
          />
          <button
            type="submit"
            style={{ padding: "8px 16px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
          >
            Check Carrier API
          </button>
          {pincodeResult && (
            <span style={{ fontSize: "13px", color: "#16a34a", fontWeight: 500 }}>
              ✓ {pincodeResult}
            </span>
          )}
        </form>
      </div>

      {/* Active Dispatched Consignments Table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>Active Consignments Stream</h2>
          <span style={{ fontSize: "12px", color: "#64748b" }}>Live Tracking via Shiprocket Webhooks</span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}>
                <th style={{ padding: "12px 16px" }}>AWB / Waybill</th>
                <th style={{ padding: "12px 16px" }}>Order</th>
                <th style={{ padding: "12px 16px" }}>Recipient</th>
                <th style={{ padding: "12px 16px" }}>Carrier</th>
                <th style={{ padding: "12px 16px" }}>Declared Value</th>
                <th style={{ padding: "12px 16px" }}>Transit Insurance</th>
                <th style={{ padding: "12px 16px" }}>Tracking Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 700, fontFamily: "monospace", color: "#0284c7" }}>
                    {s.awb}
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 600 }}>{s.orderId}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>{s.customer}</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{s.city}</div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#475569" }}>{s.courier}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 600 }}>{formatPrice(s.value)}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px" }}>
                      🛡️ {s.insurance}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background: s.status === "Delivered" ? "#dcfce7" : "#e0e7ff",
                        color: s.status === "Delivered" ? "#15803d" : "#4338ca",
                        padding: "3px 8px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      ● {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .shipping-carriers {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
