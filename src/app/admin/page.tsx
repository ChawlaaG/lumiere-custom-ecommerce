"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/data/products";

const salesTrend = [
  { month: "Jan", revenue: 2840000, orders: 120 },
  { month: "Feb", revenue: 3120000, orders: 135 },
  { month: "Mar", revenue: 3450000, orders: 148 },
  { month: "Apr", revenue: 3200000, orders: 138 },
  { month: "May", revenue: 3950000, orders: 172 },
  { month: "Jun", revenue: 4100000, orders: 180 },
  { month: "Jul", revenue: 4350000, orders: 191 },
  { month: "Aug", revenue: 4620000, orders: 204 },
  { month: "Sep", revenue: 4890000, orders: 215 },
  { month: "Oct", revenue: 5240000, orders: 228 },
];

const recentOrders = [
  {
    id: "ECK-2024-8849",
    customer: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    city: "Mumbai, MH",
    items: "Lumière Solitaire + Pavé Band",
    total: 127000,
    status: "In Transit",
    payment: "UPI (Google Pay)",
    date: "Today, 11:24 AM",
  },
  {
    id: "ECK-2024-8848",
    customer: "Priya Varma",
    email: "priya.v@example.com",
    city: "Bengaluru, KA",
    items: "Three-Stone Diamond Ring",
    total: 110000,
    status: "Processing",
    payment: "HDFC Credit Card",
    date: "Today, 09:15 AM",
  },
  {
    id: "ECK-2024-8847",
    customer: "Karan Singhal",
    email: "karan.s@example.com",
    city: "New Delhi, DL",
    items: "Diamond Eternity Ring",
    total: 95000,
    status: "Pending",
    payment: "ICICI NetBanking",
    date: "Yesterday, 06:40 PM",
  },
  {
    id: "ECK-2024-8846",
    customer: "Sneha Nair",
    email: "sneha.n@example.com",
    city: "Kochi, KL",
    items: "Diamond Solitaire Studs",
    total: 48000,
    status: "Delivered",
    payment: "UPI (PhonePe)",
    date: "Oct 02, 2024",
  },
  {
    id: "ECK-2024-8845",
    customer: "Rohan Mehta",
    email: "rohan.m@example.com",
    city: "Ahmedabad, GJ",
    items: "Secret Heart Solitaire Ring",
    total: 92000,
    status: "Delivered",
    payment: "Razorpay Card",
    date: "Oct 01, 2024",
  },
];

const lowStockItems = [
  { sku: "ECK-SOL-18Y-6", name: "Lumière Solitaire (18k Yellow / Size 6)", stock: 1, threshold: 3 },
  { sku: "ECK-BAN-PAV-18R", name: "Pavé Diamond Band (18k Rose)", stock: 2, threshold: 5 },
  { sku: "ECK-STU-050-14W", name: "Diamond Solitaire Studs 0.5ct", stock: 1, threshold: 4 },
];

const bestSellers = [
  { name: "Lumière Solitaire Diamond Ring", category: "Engagement Rings", units: 48, revenue: 4080000 },
  { name: "Pavé Diamond Wedding Band", category: "Wedding Bands", units: 62, revenue: 2604000 },
  { name: "Secret Heart Diamond Ring", category: "Engagement Rings", units: 28, revenue: 2576000 },
  { name: "Diamond Solitaire Studs", category: "Earrings", units: 36, revenue: 1728000 },
];

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Business Executive Dashboard</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Real-time sales, order fulfillment, and jewelry atelier operations
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              padding: "8px 12px",
              background: "#fff",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "13px",
              color: "#334155",
              cursor: "pointer",
            }}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last Quarter</option>
            <option value="1y">Year to Date (2024)</option>
          </select>

          <Link
            href="/admin/products"
            style={{
              padding: "8px 16px",
              background: "#0f172a",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* 4 High-Level KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "28px" }} className="admin-kpi-grid">
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Gross Revenue</span>
            <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>+22.4%</span>
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#0f172a" }}>₹42,85,400</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>vs ₹34,98,000 previous period</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Orders Count</span>
            <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>+14.8%</span>
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#0f172a" }}>184 Orders</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>8 pending fulfillment today</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Average Order Value</span>
            <span style={{ background: "#fef3c7", color: "#b45309", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>+6.2%</span>
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#0f172a" }}>₹23,290</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Driven by 18k bridal sets</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Store Conversion Rate</span>
            <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>3.84%</span>
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#0f172a" }}>3.84%</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Industry avg for luxury: 1.6%</div>
        </div>
      </div>

      {/* Revenue Graph & Low Stock Split */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "24px", marginBottom: "28px" }} className="admin-middle-grid">
        {/* Sales Trend Visual Chart */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a" }}>Monthly Revenue Progression (INR Lakhs)</h2>
              <div style={{ fontSize: "12px", color: "#64748b" }}>Steady monthly growth from Jan to Oct 2024</div>
            </div>
            <span style={{ fontSize: "12px", color: "#b69d74", fontWeight: 600 }}>✦ 83% Repeat / Referral Inquiries</span>
          </div>

          {/* Bar Chart Container */}
          <div style={{ display: "flex", alignItems: "flex-end", height: "180px", gap: "12px", paddingTop: "20px", borderBottom: "1px solid #e2e8f0" }}>
            {salesTrend.map((item, idx) => {
              const maxVal = 5500000;
              const heightPercent = (item.revenue / maxVal) * 100;
              return (
                <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      width: "100%",
                      height: `${heightPercent}%`,
                      background: idx === salesTrend.length - 1 ? "#b69d74" : "#1e293b",
                      borderRadius: "4px 4px 0 0",
                      transition: "height 300ms ease",
                      position: "relative",
                    }}
                    title={`${item.month}: ${formatPrice(item.revenue)} (${item.orders} orders)`}
                  />
                  <span style={{ fontSize: "11px", color: "#64748b", marginTop: "8px" }}>{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a" }}>⚠️ Low-Stock Workshop Alerts</h2>
              <div style={{ fontSize: "12px", color: "#64748b" }}>Critical inventory needing casting</div>
            </div>
            <Link href="/admin/inventory" style={{ fontSize: "12px", color: "#b69d74", fontWeight: 600, textDecoration: "none" }}>
              View All
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {lowStockItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "12px 14px",
                  background: "#fff1f2",
                  border: "1px solid #fecdd3",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#9f1239" }}>{item.name}</div>
                  <div style={{ fontSize: "11px", color: "#be123c", marginTop: "2px" }}>
                    SKU: {item.sku} • Threshold: {item.threshold}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ background: "#e11d48", color: "#fff", padding: "3px 8px", borderRadius: "100px", fontSize: "11px", fontWeight: 700 }}>
                    {item.stock} LEFT
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/admin/inventory"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "16px",
              padding: "10px",
              border: "1px dashed #cbd5e1",
              borderRadius: "6px",
              fontSize: "12px",
              color: "#475569",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            + Notify Master Jeweler for Casting Run
          </Link>
        </div>
      </div>

      {/* Recent Orders & Best Sellers Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }} className="admin-bottom-grid">
        {/* Recent Orders Table */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a" }}>Recent Orders Stream</h2>
              <div style={{ fontSize: "12px", color: "#64748b" }}>Live incoming orders with payment verification</div>
            </div>
            <Link href="/admin/orders" style={{ fontSize: "12px", color: "#b69d74", fontWeight: 600, textDecoration: "none" }}>
              Manage Orders (184) →
            </Link>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}>
                  <th style={{ padding: "10px 12px" }}>Order ID</th>
                  <th style={{ padding: "10px 12px" }}>Customer</th>
                  <th style={{ padding: "10px 12px" }}>Items</th>
                  <th style={{ padding: "10px 12px" }}>Total</th>
                  <th style={{ padding: "10px 12px" }}>Status</th>
                  <th style={{ padding: "10px 12px" }}>Payment</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  let statusBg = "#f1f5f9";
                  let statusColor = "#475569";
                  if (order.status === "Delivered") {
                    statusBg = "#dcfce7";
                    statusColor = "#15803d";
                  } else if (order.status === "In Transit") {
                    statusBg = "#e0e7ff";
                    statusColor = "#4338ca";
                  } else if (order.status === "Processing") {
                    statusBg = "#fef3c7";
                    statusColor = "#b45309";
                  } else if (order.status === "Pending") {
                    statusBg = "#fee2e2";
                    statusColor = "#b91c1c";
                  }

                  return (
                    <tr key={order.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px", fontWeight: 600, color: "#0f172a" }}>{order.id}</td>
                      <td style={{ padding: "12px" }}>
                        <div style={{ fontWeight: 500, color: "#1e293b" }}>{order.customer}</div>
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>{order.city}</div>
                      </td>
                      <td style={{ padding: "12px", color: "#475569", maxWidth: "200px" }}>{order.items}</td>
                      <td style={{ padding: "12px", fontWeight: 600 }}>{formatPrice(order.total)}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ background: statusBg, color: statusColor, padding: "3px 8px", borderRadius: "100px", fontSize: "11px", fontWeight: 600 }}>
                          ● {order.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px", fontSize: "12px", color: "#64748b" }}>{order.payment}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Sellers */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}>Best-Selling Pieces</h2>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>By unit volume & gross sales</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {bestSellers.map((item, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: idx === bestSellers.length - 1 ? "none" : "1px solid #f1f5f9", paddingBottom: "12px" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{item.name}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>{item.category} • {item.units} sold</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#b69d74" }}>{formatPrice(item.revenue)}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "24px", padding: "14px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>💡 Gemologist Note</div>
            <div style={{ fontSize: "11px", color: "#64748b", lineHeight: 1.5 }}>
              Solitaire rings combined with pavé wedding bands account for 68% of all cart checkouts. Consider offering bundled bridal suite savings.
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .admin-kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .admin-middle-grid, .admin-bottom-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .admin-kpi-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
