"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/data/products";

interface Order {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing" | "Quality Check";
  trackingNumber: string;
  carrier: string;
  total: number;
  items: {
    name: string;
    image: string;
    metal: string;
    size: string;
    price: number;
    quantity: number;
  }[];
}

const mockOrders: Order[] = [
  {
    id: "ECK-2024-8849",
    date: "October 01, 2024",
    status: "In Transit",
    trackingNumber: "BD-882910482IN",
    carrier: "BlueDart Secure Air",
    total: 127000,
    items: [
      {
        name: "Lumière Solitaire Diamond Ring",
        image: "/images/hero-ring.jpg",
        metal: "18k Yellow Gold",
        size: "6 (US)",
        price: 85000,
        quantity: 1,
      },
      {
        name: "Pavé Diamond Wedding Band",
        image: "/images/collection-hero.jpg",
        metal: "18k Yellow Gold",
        size: "6 (US)",
        price: 42000,
        quantity: 1,
      },
    ],
  },
  {
    id: "ECK-2024-7102",
    date: "August 15, 2024",
    status: "Delivered",
    trackingNumber: "BD-771920831IN",
    carrier: "BlueDart Secure Air",
    total: 48000,
    items: [
      {
        name: "Diamond Solitaire Stud Earrings",
        image: "/images/product-ring-1.jpg",
        metal: "14k White Gold",
        size: "0.50 ct each",
        price: 48000,
        quantity: 1,
      },
    ],
  },
];

const mockWishlist = [
  {
    id: "prod-4",
    name: "Diamond Eternity Ring",
    price: 95000,
    image: "/images/hero-ring.jpg",
    metal: "18k Rose Gold",
    inStock: true,
    shipsIn: "Ships in 24 hours",
  },
  {
    id: "prod-6",
    name: "Solitaire Diamond Pendant",
    price: 36000,
    image: "/images/collection-hero.jpg",
    metal: "18k Yellow Gold",
    inStock: true,
    shipsIn: "Ships in 24 hours",
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "consultations">("orders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(mockOrders[0]);
  const [trackingCopied, setTrackingCopied] = useState(false);

  const copyTracking = (num: string) => {
    navigator.clipboard?.writeText(num);
    setTrackingCopied(true);
    setTimeout(() => setTrackingCopied(false), 2000);
  };

  return (
    <div style={{ background: "var(--clr-bg)", minHeight: "90vh", padding: "40px 0 80px" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        {/* Header Profile Card */}
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--clr-border)",
            borderRadius: "var(--radius-md)",
            padding: "32px",
            marginBottom: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "var(--clr-bg-dark)",
                color: "var(--clr-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 400,
                letterSpacing: "0.05em",
              }}
            >
              AS
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <h1 style={{ fontSize: "22px", fontWeight: 400 }}>Aditya Sharma</h1>
                <span
                  style={{
                    background: "rgba(182, 157, 116, 0.15)",
                    color: "var(--clr-accent)",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "100px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  ✦ VIP Atelier Member
                </span>
              </div>
              <div style={{ fontSize: "13px", color: "var(--clr-text-muted)" }}>
                aditya.sharma@example.com • +91 98201 45678
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <Link
              href="/admin"
              style={{
                padding: "10px 18px",
                border: "1px solid var(--clr-border)",
                borderRadius: "var(--radius-sm)",
                fontSize: "12px",
                fontWeight: 500,
                background: "#faf9f7",
                color: "var(--clr-text)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              ⚙️ Switch to Admin Portal
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--clr-border)", marginBottom: "32px", overflowX: "auto" }}>
          {[
            { id: "orders", label: "Orders & Live Tracking", icon: "📦" },
            { id: "wishlist", label: "Saved Wishlist (2)", icon: "🤍" },
            { id: "addresses", label: "Saved Addresses", icon: "📍" },
            { id: "consultations", label: "Atelier Appointments", icon: "💎" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: "12px 20px",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid var(--clr-text)" : "2px solid transparent",
                fontSize: "14px",
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? "var(--clr-text)" : "var(--clr-text-muted)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content: Orders */}
        {activeTab === "orders" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px" }} className="account-grid">
            {/* Orders list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${selectedOrder?.id === order.id ? "var(--clr-accent)" : "var(--clr-border)"}`,
                    borderRadius: "var(--radius-md)",
                    padding: "24px",
                    cursor: "pointer",
                    transition: "all 200ms",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "var(--clr-text-muted)", display: "block" }}>Order Number</span>
                      <strong style={{ fontSize: "16px", color: "var(--clr-text)" }}>{order.id}</strong>
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "4px 12px",
                        borderRadius: "100px",
                        background: order.status === "Delivered" ? "rgba(74, 140, 111, 0.12)" : "rgba(182, 157, 116, 0.15)",
                        color: order.status === "Delivered" ? "var(--clr-success)" : "var(--clr-accent)",
                      }}
                    >
                      ● {order.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ width: "50px", height: "50px", position: "relative", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--clr-bg-alt)" }}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                      </div>
                    ))}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ fontSize: "13px", fontWeight: 500 }}>
                        {order.items.length} {order.items.length === 1 ? "Fine Item" : "Fine Items"}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--clr-text-muted)" }}>Placed on {order.date}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid var(--clr-border-light)", fontSize: "13px" }}>
                    <span style={{ color: "var(--clr-text-muted)" }}>Total Paid</span>
                    <strong style={{ color: "var(--clr-text)", fontSize: "15px" }}>{formatPrice(order.total)}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Order Detailed Drawer / Tracking Timeline */}
            {selectedOrder && (
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--clr-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "28px",
                  height: "fit-content",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Tracking & Shipment</h3>
                  <button
                    type="button"
                    onClick={() => copyTracking(selectedOrder.trackingNumber)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "11px",
                      color: "var(--clr-accent)",
                      cursor: "pointer",
                    }}
                  >
                    {trackingCopied ? "✓ Copied AWB!" : "📋 Copy AWB"}
                  </button>
                </div>

                {/* Carrier info */}
                <div style={{ background: "var(--clr-bg)", padding: "16px", borderRadius: "var(--radius-sm)", marginBottom: "24px" }}>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--clr-text-light)", marginBottom: "4px" }}>
                    Courier Partner
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--clr-text)" }}>
                    {selectedOrder.carrier}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--clr-text-muted)", marginTop: "2px" }}>
                    AWB: {selectedOrder.trackingNumber}
                  </div>
                </div>

                {/* Vertical Stepper */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "28px" }}>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--clr-text)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>✓</div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600 }}>Order Received & Allocated</div>
                      <div style={{ fontSize: "11px", color: "var(--clr-text-light)" }}>Oct 01, 2024 • 10:30 AM</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--clr-text)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>✓</div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600 }}>IGI Certified & BIS Hallmarked</div>
                      <div style={{ fontSize: "11px", color: "var(--clr-text-light)" }}>Oct 02, 2024 • 03:15 PM</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: selectedOrder.status === "Delivered" ? "var(--clr-text)" : "var(--clr-accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>
                      {selectedOrder.status === "Delivered" ? "✓" : "●"}
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600 }}>In Transit via Air Express</div>
                      <div style={{ fontSize: "11px", color: "var(--clr-text-muted)" }}>Out for airport hub dispatch</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", opacity: selectedOrder.status === "Delivered" ? 1 : 0.4 }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: selectedOrder.status === "Delivered" ? "var(--clr-success)" : "#e8e4de", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>
                      {selectedOrder.status === "Delivered" ? "✓" : "4"}
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600 }}>Delivered to Recipient</div>
                      <div style={{ fontSize: "11px", color: "var(--clr-text-light)" }}>
                        {selectedOrder.status === "Delivered" ? "Completed" : "Estimated in 1–2 days"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => alert("Downloading GST Invoice PDF for " + selectedOrder.id)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid var(--clr-border)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "13px",
                      fontWeight: 500,
                      background: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    📄 Download Tax Invoice (PDF)
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Connecting to 24/7 Diamond Atelier specialist for ring re-sizing.")}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "13px",
                      fontWeight: 500,
                      background: "var(--clr-bg-alt)",
                      color: "var(--clr-text)",
                      cursor: "pointer",
                    }}
                  >
                    Request Free Ring Resizing
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Wishlist */}
        {activeTab === "wishlist" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {mockWishlist.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  border: "1px solid var(--clr-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ height: "240px", position: "relative", borderRadius: "var(--radius-sm)", overflow: "hidden", marginBottom: "16px", background: "var(--clr-bg-alt)" }}>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "4px" }}>{item.name}</div>
                <div style={{ fontSize: "12px", color: "var(--clr-text-muted)", marginBottom: "8px" }}>{item.metal}</div>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--clr-accent)", marginBottom: "16px" }}>
                  {formatPrice(item.price)}
                </div>
                <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
                  <Link
                    href={`/cart`}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: "10px", fontSize: "12px", textAlign: "center" }}
                  >
                    Move to Bag
                  </Link>
                  <button
                    type="button"
                    style={{
                      padding: "10px 14px",
                      background: "none",
                      border: "1px solid var(--clr-border)",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "var(--clr-sale)",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Addresses */}
        {activeTab === "addresses" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="addresses-grid">
            <div style={{ background: "#fff", border: "1.5px solid var(--clr-accent)", borderRadius: "var(--radius-md)", padding: "24px", position: "relative" }}>
              <span style={{ position: "absolute", top: "16px", right: "16px", background: "var(--clr-accent)", color: "#fff", fontSize: "10px", padding: "3px 8px", borderRadius: "100px", fontWeight: 600 }}>
                DEFAULT
              </span>
              <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "8px" }}>Residence</h3>
              <p style={{ fontSize: "14px", color: "var(--clr-text)", lineHeight: 1.5, marginBottom: "16px" }}>
                Aditya Sharma<br />
                Flat 1402, Altamount Signature Towers<br />
                Altamount Road, Cumballa Hill<br />
                Mumbai, Maharashtra — 400026<br />
                Phone: +91 98201 45678
              </p>
              <div style={{ display: "flex", gap: "12px", fontSize: "12px" }}>
                <button type="button" style={{ background: "none", border: "none", color: "var(--clr-accent)", fontWeight: 500, cursor: "pointer" }}>Edit</button>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px dashed var(--clr-border)", borderRadius: "var(--radius-md)", padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", cursor: "pointer" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--clr-bg-alt)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", marginBottom: "12px" }}>+</div>
              <div style={{ fontSize: "14px", fontWeight: 500 }}>Add New Delivery Address</div>
              <div style={{ fontSize: "12px", color: "var(--clr-text-light)" }}>Domestic or international dispatch</div>
            </div>
          </div>
        )}

        {/* Tab Content: Consultations */}
        {activeTab === "consultations" && (
          <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "32px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "12px" }}>Complimentary Atelier Diamond Consultations</h3>
            <p style={{ fontSize: "14px", color: "var(--clr-text-muted)", maxWidth: "600px", marginBottom: "24px" }}>
              Meet 1-on-1 with our Master Gemologist via High-Definition Video or at our private showroom in Mumbai / Montreal. We will inspect loose diamonds, discuss custom settings, and measure ring sizes in real time.
            </p>
            <div style={{ background: "var(--clr-bg)", padding: "20px", borderRadius: "var(--radius-sm)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>Next Available Slot: Tomorrow, 4:00 PM IST</div>
                <div style={{ fontSize: "12px", color: "var(--clr-text-muted)" }}>Duration: 45 Minutes • Video or Showroom</div>
              </div>
              <button
                type="button"
                onClick={() => alert("Consultation booking reserved. Our concierge will send a Google Meet link.")}
                className="btn btn-primary"
                style={{ padding: "10px 20px", fontSize: "13px" }}
              >
                Reserve Appointment
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @media (max-width: 800px) {
          .account-grid, .addresses-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
