"use client";

import { useState } from "react";
import { formatPrice } from "@/data/products";

interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: {
    name: string;
    metal: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  awb?: string;
  carrier?: string;
  date: string;
}

const mockOrders: AdminOrder[] = [
  {
    id: "ECK-2024-8849",
    customer: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    phone: "+91 98201 45678",
    address: "Flat 1402, Altamount Signature Towers, Altamount Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400026",
    items: [
      { name: "Lumière Solitaire Diamond Ring", metal: "18k Yellow Gold", size: "6 (US)", price: 85000, quantity: 1 },
      { name: "Pavé Diamond Wedding Band", metal: "18k Yellow Gold", size: "6 (US)", price: 42000, quantity: 1 },
    ],
    subtotal: 127000,
    tax: 3810,
    total: 130810,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    status: "Shipped",
    awb: "BD-882910482IN",
    carrier: "BlueDart Air Express",
    date: "Today, 11:24 AM",
  },
  {
    id: "ECK-2024-8848",
    customer: "Priya Varma",
    email: "priya.v@example.com",
    phone: "+91 99002 11223",
    address: "42, Lavelle Road, Shanthala Nagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    items: [
      { name: "Three-Stone Diamond Engagement Ring", metal: "18k White Gold", size: "6.5 (US)", price: 110000, quantity: 1 },
    ],
    subtotal: 110000,
    tax: 3300,
    total: 113300,
    paymentMethod: "HDFC Credit Card",
    paymentStatus: "Paid",
    status: "Processing",
    date: "Today, 09:15 AM",
  },
  {
    id: "ECK-2024-8847",
    customer: "Karan Singhal",
    email: "karan.s@example.com",
    phone: "+91 98110 99887",
    address: "B-4/12 Vasant Vihar",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110057",
    items: [
      { name: "Diamond Eternity Band", metal: "18k Rose Gold", size: "7 (US)", price: 95000, quantity: 1 },
    ],
    subtotal: 95000,
    tax: 2850,
    total: 97850,
    paymentMethod: "ICICI NetBanking",
    paymentStatus: "Pending",
    status: "Pending",
    date: "Yesterday, 06:40 PM",
  },
  {
    id: "ECK-2024-8846",
    customer: "Sneha Nair",
    email: "sneha.n@example.com",
    phone: "+91 97450 33445",
    address: "12 Marine Drive Residences",
    city: "Kochi",
    state: "Kerala",
    pincode: "682011",
    items: [
      { name: "Diamond Solitaire Stud Earrings", metal: "14k White Gold", size: "0.50 ct each", price: 48000, quantity: 1 },
    ],
    subtotal: 48000,
    tax: 1440,
    total: 49440,
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    status: "Delivered",
    awb: "BD-771920831IN",
    carrier: "BlueDart Air Express",
    date: "Oct 02, 2024",
  },
  {
    id: "ECK-2024-8845",
    customer: "Rohan Mehta",
    email: "rohan.m@example.com",
    phone: "+91 98790 55667",
    address: "704 Bodakdev Skyvillas",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380054",
    items: [
      { name: "Secret Heart Solitaire Ring", metal: "18k Yellow Gold", size: "5.5 (US)", price: 92000, quantity: 1 },
    ],
    subtotal: 92000,
    tax: 2760,
    total: 94760,
    paymentMethod: "Razorpay Card",
    paymentStatus: "Paid",
    status: "Delivered",
    awb: "BD-661902812IN",
    carrier: "BlueDart Air Express",
    date: "Oct 01, 2024",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(mockOrders);
  const [filter, setFilter] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(mockOrders[0]);
  const [isGeneratingLabel, setIsGeneratingLabel] = useState(false);

  const handleUpdateStatus = (id: string, newStatus: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleGenerateAWB = () => {
    if (!selectedOrder) return;
    setIsGeneratingLabel(true);
    setTimeout(() => {
      setIsGeneratingLabel(false);
      const newAwb = `BD-${Math.floor(100000000 + Math.random() * 900000000)}IN`;
      const updated = {
        ...selectedOrder,
        awb: newAwb,
        carrier: "BlueDart Secure Air Express",
        status: "Shipped" as const,
      };
      setSelectedOrder(updated);
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      alert(`Shiprocket Manifest Created! AWB Assigned: ${newAwb}`);
    }, 1000);
  };

  const filteredOrders = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Order Fulfillment & Logistics</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Track client orders, generate shipping manifests, process payments, and dispatch insured jewelry
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={() => alert("Exporting GST GSTR-1 Sales Report (Excel / CSV)...")}
            style={{
              padding: "9px 16px",
              background: "#fff",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            📥 Export Sales GST CSV
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", overflowX: "auto" }}>
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((tab) => {
          const count = tab === "All" ? orders.length : orders.filter((o) => o.status === tab).length;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              style={{
                padding: "8px 16px",
                border: "none",
                background: filter === tab ? "#0f172a" : "#f1f5f9",
                color: filter === tab ? "#ffffff" : "#475569",
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>{tab}</span>
              <span style={{ fontSize: "11px", opacity: 0.8 }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Orders Table + Details Inspector */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "24px" }} className="admin-orders-grid">
        {/* Orders Table */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}>
                  <th style={{ padding: "12px 14px" }}>Order</th>
                  <th style={{ padding: "12px 14px" }}>Customer</th>
                  <th style={{ padding: "12px 14px" }}>Items</th>
                  <th style={{ padding: "12px 14px" }}>Total</th>
                  <th style={{ padding: "12px 14px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelectedOrder(o)}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      background: selectedOrder?.id === o.id ? "#faf7f2" : "#fff",
                      cursor: "pointer",
                      transition: "background 150ms",
                    }}
                  >
                    <td style={{ padding: "14px", fontWeight: 700, color: "#0f172a" }}>
                      <div>{o.id}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 400 }}>{o.date}</div>
                    </td>
                    <td style={{ padding: "14px" }}>
                      <div style={{ fontWeight: 600, color: "#1e293b" }}>{o.customer}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{o.city}, {o.state}</div>
                    </td>
                    <td style={{ padding: "14px", color: "#475569" }}>
                      {o.items.length} {o.items.length === 1 ? "Piece" : "Pieces"}
                    </td>
                    <td style={{ padding: "14px", fontWeight: 600 }}>{formatPrice(o.total)}</td>
                    <td style={{ padding: "14px" }}>
                      <span
                        style={{
                          background:
                            o.status === "Delivered"
                              ? "#dcfce7"
                              : o.status === "Shipped"
                              ? "#e0e7ff"
                              : o.status === "Processing"
                              ? "#fef3c7"
                              : "#fee2e2",
                          color:
                            o.status === "Delivered"
                              ? "#15803d"
                              : o.status === "Shipped"
                              ? "#4338ca"
                              : o.status === "Processing"
                              ? "#b45309"
                              : "#b91c1c",
                          padding: "3px 8px",
                          borderRadius: "100px",
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        ● {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Order Detailed Drawer */}
        {selectedOrder ? (
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              height: "fit-content",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b" }}>
                  Order Details
                </span>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>{selectedOrder.id}</h2>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Placed {selectedOrder.date}</div>
              </div>

              {/* Status Selector */}
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#64748b", marginBottom: "4px" }}>
                  Update Lifecycle
                </label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value as any)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "12px",
                    fontWeight: 600,
                    background: "#f8fafc",
                    cursor: "pointer",
                  }}
                >
                  <option value="Pending">Pending Review</option>
                  <option value="Processing">In Atelier Processing</option>
                  <option value="Shipped">Dispatched / Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>
                Recipient & Delivery Address
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>{selectedOrder.customer}</div>
              <div style={{ fontSize: "12px", color: "#475569", marginTop: "2px", lineHeight: 1.5 }}>
                {selectedOrder.address}<br />
                {selectedOrder.city}, {selectedOrder.state} — {selectedOrder.pincode}<br />
                Phone: {selectedOrder.phone} • Email: {selectedOrder.email}
              </div>
            </div>

            {/* Items List */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "#64748b", marginBottom: "10px" }}>
                Pieces in this Consignment
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{item.name}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>
                        {item.metal} • Size {item.size} • Qty {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", fontSize: "14px", fontWeight: 700 }}>
                <span>Total Amount</span>
                <span style={{ color: "#b69d74" }}>{formatPrice(selectedOrder.total)}</span>
              </div>
              <div style={{ fontSize: "11px", color: "#16a34a", marginTop: "4px" }}>
                ✓ {selectedOrder.paymentStatus} via {selectedOrder.paymentMethod}
              </div>
            </div>

            {/* Shipping / AWB Bar */}
            <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>
                Logistics & Air Courier (Shiprocket API)
              </div>
              {selectedOrder.awb ? (
                <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "12px", borderRadius: "6px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#1e40af" }}>
                    AWB: {selectedOrder.awb}
                  </div>
                  <div style={{ fontSize: "11px", color: "#3b82f6" }}>Carrier: {selectedOrder.carrier}</div>
                  <div style={{ fontSize: "10px", color: "#64748b", marginTop: "4px" }}>
                    Transit Insurance: Active (100% Value Protected)
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerateAWB}
                  disabled={isGeneratingLabel}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#0284c7",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {isGeneratingLabel ? "Calling Shiprocket API..." : "⚡ Generate BlueDart Air Express AWB Label"}
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                onClick={() => alert("Printing GST Tax Invoice for " + selectedOrder.id)}
                style={{
                  padding: "10px",
                  background: "#fff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                📄 Print Tax Invoice
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Initiate Razorpay / Bank Refund for " + formatPrice(selectedOrder.total) + "?")) {
                    handleUpdateStatus(selectedOrder.id, "Cancelled");
                    alert("Refund initiated to original payment method.");
                  }
                }}
                style={{
                  padding: "10px",
                  background: "#fff",
                  border: "1px solid #fecdd3",
                  color: "#e11d48",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ↺ Process Refund
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "40px", textAlign: "center", color: "#94a3b8" }}>
            Select an order to inspect details
          </div>
        )}
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .admin-orders-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
