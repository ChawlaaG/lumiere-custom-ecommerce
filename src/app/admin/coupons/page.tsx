"use client";

import { useState } from "react";
import { formatPrice } from "@/data/products";

interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder: number;
  usedCount: number;
  usageLimit: number;
  expiry: string;
  active: boolean;
}

const initialCoupons: Coupon[] = [
  { id: "c-1", code: "WELCOME10", type: "percentage", value: 10, minOrder: 30000, usedCount: 84, usageLimit: 500, expiry: "Dec 31, 2024", active: true },
  { id: "c-2", code: "ECKSANDLUXE", type: "percentage", value: 15, minOrder: 100000, usedCount: 29, usageLimit: 100, expiry: "Nov 30, 2024", active: true },
  { id: "c-3", code: "DIAMOND5000", type: "fixed", value: 5000, minOrder: 75000, usedCount: 42, usageLimit: 200, expiry: "Dec 15, 2024", active: true },
  { id: "c-4", code: "BRIDALSUITE", type: "percentage", value: 12, minOrder: 120000, usedCount: 16, usageLimit: 50, expiry: "Jan 31, 2025", active: true },
  { id: "c-5", code: "SUMMERFEST", type: "percentage", value: 10, minOrder: 25000, usedCount: 150, usageLimit: 150, expiry: "Aug 31, 2024", active: false },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [showModal, setShowModal] = useState(false);

  // New coupon fields
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState<"percentage" | "fixed">("percentage");
  const [newValue, setNewValue] = useState("");
  const [newMinOrder, setNewMinOrder] = useState("");
  const [newLimit, setNewLimit] = useState("100");
  const [newExpiry, setNewExpiry] = useState("2024-12-31");

  const toggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newValue) return;

    const newC: Coupon = {
      id: `c-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      type: newType,
      value: Number(newValue),
      minOrder: Number(newMinOrder) || 0,
      usedCount: 0,
      usageLimit: Number(newLimit) || 100,
      expiry: newExpiry,
      active: true,
    };

    setCoupons([newC, ...coupons]);
    setShowModal(false);
    setNewCode("");
    setNewValue("");
    setNewMinOrder("");
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Promotions & Coupon Engine</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Configure percentage discounts, minimum order thresholds, and private client promotional codes
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 18px",
            background: "#0f172a",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>+</span> Create Promo Code
        </button>
      </div>

      {/* Coupons Table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}>
                <th style={{ padding: "12px 16px" }}>Promo Code</th>
                <th style={{ padding: "12px 16px" }}>Benefit</th>
                <th style={{ padding: "12px 16px" }}>Min. Order Spend</th>
                <th style={{ padding: "12px 16px" }}>Redemptions</th>
                <th style={{ padding: "12px 16px" }}>Valid Until</th>
                <th style={{ padding: "12px 16px" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>Toggle</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 700, fontFamily: "monospace", fontSize: "14px", color: "#0f172a" }}>
                      {c.code}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "#16a34a" }}>
                    {c.type === "percentage" ? `${c.value}% OFF` : `${formatPrice(c.value)} OFF`}
                  </td>
                  <td style={{ padding: "14px 16px", color: "#475569" }}>
                    {c.minOrder > 0 ? formatPrice(c.minOrder) : "No minimum"}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: "12px", color: "#0f172a", fontWeight: 500 }}>
                      {c.usedCount} / {c.usageLimit}
                    </div>
                    <div style={{ width: "100px", height: "4px", background: "#f1f5f9", borderRadius: "100px", overflow: "hidden", marginTop: "4px" }}>
                      <div
                        style={{
                          width: `${Math.min(100, (c.usedCount / c.usageLimit) * 100)}%`,
                          height: "100%",
                          background: c.usedCount >= c.usageLimit ? "#ef4444" : "#b69d74",
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#64748b" }}>{c.expiry}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background: c.active ? "#dcfce7" : "#f1f5f9",
                        color: c.active ? "#15803d" : "#64748b",
                        padding: "3px 8px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      ● {c.active ? "Active" : "Disabled / Expired"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => toggleCoupon(c.id)}
                      style={{
                        padding: "6px 12px",
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {c.active ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "32px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>Create Promo Coupon</h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#94a3b8" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE15"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", textTransform: "uppercase" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Discount Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", background: "#fff" }}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder={newType === "percentage" ? "15" : "5000"}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Minimum Order (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Max Usage Limit
                  </label>
                  <input
                    type="number"
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={newExpiry}
                  onChange={(e) => setNewExpiry(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "#0f172a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Activate Coupon
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "12px 20px",
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
