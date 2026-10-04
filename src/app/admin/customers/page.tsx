"use client";

import { useState } from "react";
import { formatPrice } from "@/data/products";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  lifetimeSpend: number;
  tier: "Diamond VIP" | "Repeat Collector" | "New Client";
  lastOrder: string;
  ringSize: string;
}

const mockCustomers: Customer[] = [
  { id: "cust-1", name: "Aditya Sharma", email: "aditya.sharma@example.com", phone: "+91 98201 45678", city: "Mumbai, MH", totalOrders: 3, lifetimeSpend: 247000, tier: "Diamond VIP", lastOrder: "Oct 01, 2024", ringSize: "US 6" },
  { id: "cust-2", name: "Priya Varma", email: "priya.v@example.com", phone: "+91 99002 11223", city: "Bengaluru, KA", totalOrders: 2, lifetimeSpend: 158000, tier: "Repeat Collector", lastOrder: "Oct 04, 2024", ringSize: "US 6.5" },
  { id: "cust-3", name: "Karan Singhal", email: "karan.s@example.com", phone: "+91 98110 99887", city: "New Delhi, DL", totalOrders: 1, lifetimeSpend: 95000, tier: "New Client", lastOrder: "Yesterday", ringSize: "US 7" },
  { id: "cust-4", name: "Sneha Nair", email: "sneha.n@example.com", phone: "+91 97450 33445", city: "Kochi, KL", totalOrders: 2, lifetimeSpend: 84000, tier: "Repeat Collector", lastOrder: "Oct 02, 2024", ringSize: "US 5" },
  { id: "cust-5", name: "Rohan Mehta", email: "rohan.m@example.com", phone: "+91 98790 55667", city: "Ahmedabad, GJ", totalOrders: 1, lifetimeSpend: 92000, tier: "New Client", lastOrder: "Oct 01, 2024", ringSize: "US 5.5" },
  { id: "cust-6", name: "Natasha Roy", email: "natasha.roy@example.com", phone: "+91 98300 77889", city: "Kolkata, WB", totalOrders: 4, lifetimeSpend: 312000, tier: "Diamond VIP", lastOrder: "Sep 22, 2024", ringSize: "US 6" },
];

export default function AdminCustomersPage() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Customer CRM & Private Clients</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Client lifetime value, preferred ring sizes, private consultation records, and purchase history
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Exporting VIP client list to encrypted CSV...")}
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
          Export Client Directory
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search clients by name, email, or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            fontSize: "13px",
            width: "360px",
            background: "#fff",
          }}
        />
      </div>

      {/* Customers Table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}>
                <th style={{ padding: "12px 16px" }}>Client</th>
                <th style={{ padding: "12px 16px" }}>City</th>
                <th style={{ padding: "12px 16px" }}>VIP Tier</th>
                <th style={{ padding: "12px 16px" }}>Ring Size</th>
                <th style={{ padding: "12px 16px" }}>Total Orders</th>
                <th style={{ padding: "12px 16px" }}>Lifetime Value (LTV)</th>
                <th style={{ padding: "12px 16px" }}>Last Order</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>Profile</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>{c.name}</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{c.email}</div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#475569" }}>{c.city}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background:
                          c.tier === "Diamond VIP"
                            ? "rgba(182, 157, 116, 0.2)"
                            : c.tier === "Repeat Collector"
                            ? "#e0e7ff"
                            : "#f1f5f9",
                        color:
                          c.tier === "Diamond VIP"
                            ? "#8b7355"
                            : c.tier === "Repeat Collector"
                            ? "#4338ca"
                            : "#475569",
                        padding: "3px 8px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      {c.tier}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 500 }}>{c.ringSize}</td>
                  <td style={{ padding: "14px 16px" }}>{c.totalOrders} Orders</td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: "#0f172a" }}>
                    {formatPrice(c.lifetimeSpend)}
                  </td>
                  <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "12px" }}>{c.lastOrder}</td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(c)}
                      style={{
                        padding: "6px 12px",
                        background: "#f1f5f9",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#0f172a",
                        cursor: "pointer",
                      }}
                    >
                      View CRM Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Dossier Modal */}
      {selectedCustomer && (
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
              maxWidth: "520px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#b69d74", fontWeight: 700 }}>
                  Client Dossier
                </span>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>{selectedCustomer.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#94a3b8" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
              <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "8px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Contact Email</span>
                    <strong>{selectedCustomer.email}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Direct Phone</span>
                    <strong>{selectedCustomer.phone}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Primary Ring Size</span>
                    <strong>{selectedCustomer.ringSize}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>VIP Membership</span>
                    <strong style={{ color: "#b69d74" }}>{selectedCustomer.tier}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ color: "#64748b" }}>Lifetime Completed Orders</span>
                <strong>{selectedCustomer.totalOrders} Orders</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ color: "#64748b" }}>Total Atelier Spend</span>
                <strong style={{ fontSize: "15px", color: "#b69d74" }}>{formatPrice(selectedCustomer.lifetimeSpend)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ color: "#64748b" }}>Last Purchase Date</span>
                <strong>{selectedCustomer.lastOrder}</strong>
              </div>

              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <a
                  href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(selectedCustomer.name)},%20this%20is%20your%20Lumiere%20fine%20jewelry%20concierge.`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#25D366",
                    color: "#fff",
                    borderRadius: "6px",
                    textAlign: "center",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                >
                  💬 Message via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => alert(`Opening email composer for ${selectedCustomer.email}`)}
                  style={{
                    padding: "10px 16px",
                    background: "#f1f5f9",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ✉️ Email Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
