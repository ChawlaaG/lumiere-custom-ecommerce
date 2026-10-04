"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/data/products";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  metal: string;
  size: string;
  quantity: number;
}

const checkoutItems: CartItem[] = [
  {
    id: "prod-1",
    name: "Lumière Solitaire Diamond Ring",
    price: 85000,
    image: "/images/hero-ring.jpg",
    metal: "18k Yellow Gold",
    size: "6 (US)",
    quantity: 1,
  },
  {
    id: "prod-2",
    name: "Pavé Diamond Wedding Band",
    price: 42000,
    image: "/images/collection-hero.jpg",
    metal: "18k Yellow Gold",
    size: "6 (US)",
    quantity: 1,
  },
];

export default function CheckoutPage() {
  const [items] = useState<CartItem[]>(checkoutItems);
  const [step, setStep] = useState<"details" | "confirmation">("details");

  // Form states
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");

  // Shipping & Payment
  const [shippingMethod, setShippingMethod] = useState<"express" | "whiteglove">("express");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "cod">("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  // Coupons
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.discount / 100)) : 0;
  const shippingCost = shippingMethod === "whiteglove" ? 2500 : 0; // Express is complimentary
  const taxableAmount = subtotal - discountAmount;
  const gstTax = Math.round(taxableAmount * 0.03); // 3% GST on fine jewelry in India
  const total = taxableAmount + shippingCost + gstTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    if (code === "WELCOME10") {
      setAppliedCoupon({ code: "WELCOME10", discount: 10 });
    } else if (code === "ECKSANDLUXE" || code === "LUXE15") {
      setAppliedCoupon({ code: "ECKSANDLUXE", discount: 15 });
    } else {
      setCouponError("Invalid promo code. Try WELCOME10 for 10% off.");
    }
  };

  const handleAutoFill = () => {
    setEmail("aditya.sharma@example.com");
    setPhone("+91 98201 45678");
    setFirstName("Aditya");
    setLastName("Sharma");
    setAddress("Flat 1402, Altamount Signature Towers, Altamount Road");
    setApartment("Tower B, 14th Floor");
    setCity("Mumbai");
    setState("Maharashtra");
    setPincode("400026");
    setUpiId("aditya@okaxis");
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setOrderId(`ECK-2024-${randomNum}`);
      setStep("confirmation");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  if (step === "confirmation") {
    return (
      <div style={{ background: "var(--clr-bg)", minHeight: "85vh", padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid var(--clr-border)",
              borderRadius: "var(--radius-md)",
              padding: "48px 36px",
              textAlign: "center",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {/* Success icon */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(74, 140, 111, 0.12)",
                color: "var(--clr-success)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <span
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--clr-accent)",
                fontWeight: 600,
                display: "block",
                marginBottom: "8px",
              }}
            >
              Order Confirmed & Insured
            </span>
            <h1 style={{ fontSize: "28px", fontWeight: 300, marginBottom: "12px", color: "var(--clr-text)" }}>
              Thank You, {firstName || "Aditya"}!
            </h1>
            <p style={{ color: "var(--clr-text-muted)", fontSize: "15px", maxWidth: "520px", margin: "0 auto 28px" }}>
              Your order <strong style={{ color: "var(--clr-text)" }}>{orderId}</strong> has been received and is being prepared in our atelier. A confirmation has been sent to{" "}
              <strong style={{ color: "var(--clr-text)" }}>{email || "your email"}</strong>.
            </p>

            {/* Tracking Card */}
            <div
              style={{
                background: "var(--clr-bg)",
                border: "1px solid var(--clr-border-light)",
                borderRadius: "var(--radius-sm)",
                padding: "24px",
                textAlign: "left",
                marginBottom: "32px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--clr-text-light)" }}>
                    Estimated Delivery
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 500, color: "var(--clr-text)" }}>
                    3 Business Days • Complimentary Insured Courier
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      background: "#e8f4ec",
                      color: "var(--clr-success)",
                      fontSize: "12px",
                      padding: "4px 10px",
                      borderRadius: "100px",
                      fontWeight: 600,
                    }}
                  >
                    ● BlueDart Secure Air Express
                  </span>
                </div>
              </div>

              {/* Progress Stepper */}
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "12px" }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--clr-text)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", margin: "0 auto 6px" }}>✓</div>
                  <div style={{ fontSize: "11px", fontWeight: 600 }}>Order Placed</div>
                  <div style={{ fontSize: "10px", color: "var(--clr-text-light)" }}>Today</div>
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--clr-accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", margin: "0 auto 6px" }}>2</div>
                  <div style={{ fontSize: "11px", fontWeight: 600 }}>Hallmark & Quality</div>
                  <div style={{ fontSize: "10px", color: "var(--clr-accent)" }}>In Progress</div>
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#e8e4de", color: "var(--clr-text-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", margin: "0 auto 6px" }}>3</div>
                  <div style={{ fontSize: "11px", color: "var(--clr-text-muted)" }}>Insured Dispatch</div>
                  <div style={{ fontSize: "10px", color: "var(--clr-text-light)" }}>Tomorrow</div>
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#e8e4de", color: "var(--clr-text-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", margin: "0 auto 6px" }}>4</div>
                  <div style={{ fontSize: "11px", color: "var(--clr-text-muted)" }}>Delivered</div>
                  <div style={{ fontSize: "10px", color: "var(--clr-text-light)" }}>In 3 Days</div>
                </div>
              </div>
            </div>

            {/* Items summary */}
            <div style={{ textAlign: "left", marginBottom: "32px" }}>
              <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px", color: "var(--clr-text)" }}>
                Items in This Order
              </h3>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: "16px", padding: "12px 0", borderBottom: "1px solid var(--clr-border-light)", alignItems: "center" }}>
                  <div style={{ width: "56px", height: "56px", position: "relative", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--clr-bg-alt)", flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--clr-text-muted)" }}>
                      {item.metal} • Size {item.size} • Qty {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", fontSize: "16px", fontWeight: 600 }}>
                <span>Total Paid</span>
                <span style={{ color: "var(--clr-accent)" }}>{formatPrice(total)}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/account"
                className="btn btn-primary"
                style={{ padding: "14px 28px" }}
              >
                Track In Customer Account
              </Link>
              <Link
                href="/"
                className="btn btn-secondary"
                style={{ padding: "14px 28px" }}
              >
                Return to Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--clr-bg)", minHeight: "100vh", padding: "40px 0 80px" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        {/* Breadcrumb & Title */}
        <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", gap: "8px", fontSize: "13px", color: "var(--clr-text-light)", marginBottom: "8px" }}>
              <Link href="/cart" style={{ color: "var(--clr-text-muted)" }}>Cart</Link>
              <span>/</span>
              <span style={{ color: "var(--clr-text)" }}>Secure Checkout</span>
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: 300, letterSpacing: "-0.02em" }}>
              Express Checkout
            </h1>
          </div>
          <button
            onClick={handleAutoFill}
            type="button"
            style={{
              background: "#fff",
              border: "1px dashed var(--clr-accent)",
              color: "var(--clr-accent)",
              padding: "8px 16px",
              borderRadius: "var(--radius-sm)",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            ⚡ Click to Auto-fill Demo Data
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "40px" }} className="checkout-layout">
          {/* Left: Form steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Step 1: Customer Contact */}
            <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 500 }}>1. Contact Details</h2>
                <span style={{ fontSize: "12px", color: "var(--clr-text-muted)" }}>Guest checkout enabled</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>
                    Phone (for tracking SMS & WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98201 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "28px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "20px" }}>2. Delivery Address</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Aditya"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sharma"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="House / Flat No., Street, Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Apartment, Suite (Optional)</label>
                <input
                  type="text"
                  placeholder="Wing B, 14th Floor"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>State *</label>
                  <input
                    type="text"
                    required
                    placeholder="Maharashtra"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>PIN Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="400026"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px" }}
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method */}
            <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "28px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "20px" }}>3. Shipping Method</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    border: `1.5px solid ${shippingMethod === "express" ? "var(--clr-accent)" : "var(--clr-border)"}`,
                    borderRadius: "var(--radius-sm)",
                    background: shippingMethod === "express" ? "rgba(139,115,85,0.04)" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                    />
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 500 }}>
                        Insured Express Delivery (Ships within 24h)
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--clr-text-muted)" }}>
                        BlueDart Secure Air Express • Full transit insurance included
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 600, color: "var(--clr-success)", fontSize: "14px" }}>FREE</span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    border: `1.5px solid ${shippingMethod === "whiteglove" ? "var(--clr-accent)" : "var(--clr-border)"}`,
                    borderRadius: "var(--radius-sm)",
                    background: shippingMethod === "whiteglove" ? "rgba(139,115,85,0.04)" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "whiteglove"}
                      onChange={() => setShippingMethod("whiteglove")}
                    />
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 500 }}>
                        White Glove Hand Delivery & Personal Sizing
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--clr-text-muted)" }}>
                        Dedicated brand specialist handover with presentation box
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 500, fontSize: "14px" }}>₹2,500</span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Method */}
            <div style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-md)", padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 500 }}>4. Payment Method</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--clr-success)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  256-Bit SSL Encrypted
                </div>
              </div>

              {/* Payment Tabs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
                {[
                  { id: "upi", label: "UPI & QR", sub: "GPay, PhonePe" },
                  { id: "card", label: "Cards", sub: "Visa, MC, Amex" },
                  { id: "netbanking", label: "NetBanking", sub: "All Banks" },
                  { id: "cod", label: "Concierge / COD", sub: "Upon Delivery" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPaymentMethod(tab.id as any)}
                    style={{
                      padding: "12px 8px",
                      textAlign: "center",
                      border: `1.5px solid ${paymentMethod === tab.id ? "var(--clr-accent)" : "var(--clr-border)"}`,
                      background: paymentMethod === tab.id ? "#faf7f2" : "#fff",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      transition: "all 150ms",
                    }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--clr-text)" }}>{tab.label}</div>
                    <div style={{ fontSize: "10px", color: "var(--clr-text-light)" }}>{tab.sub}</div>
                  </button>
                ))}
              </div>

              {/* UPI content */}
              {paymentMethod === "upi" && (
                <div style={{ padding: "20px", background: "var(--clr-bg)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
                    <div
                      style={{
                        width: "110px",
                        height: "110px",
                        background: "#fff",
                        border: "1px solid var(--clr-border)",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px",
                      }}
                    >
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="7" y="7" width="1" height="1" fill="currentColor" />
                        <rect x="18" y="7" width="1" height="1" fill="currentColor" />
                        <rect x="7" y="18" width="1" height="1" fill="currentColor" />
                      </svg>
                      <span style={{ fontSize: "10px", color: "var(--clr-text-muted)", marginTop: "4px" }}>Scan & Pay</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>
                        Or Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@okaxis or mobile@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "#fff", marginBottom: "8px" }}
                      />
                      <span style={{ fontSize: "11px", color: "var(--clr-text-muted)" }}>
                        Supports Google Pay, PhonePe, Paytm, BHIM and all major UPI apps.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card content */}
              {paymentMethod === "card" && (
                <div style={{ padding: "20px", background: "var(--clr-bg)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Card Number</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "#fff" }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "#fff" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "#fff" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px" }}>Name on Card</label>
                      <input
                        type="text"
                        placeholder="Aditya Sharma"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "#fff" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Netbanking content */}
              {paymentMethod === "netbanking" && (
                <div style={{ padding: "20px", background: "var(--clr-bg)", borderRadius: "var(--radius-sm)" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "8px" }}>Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    style={{ width: "100%", padding: "12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "14px", background: "#fff" }}
                  >
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India (SBI)</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* COD content */}
              {paymentMethod === "cod" && (
                <div style={{ padding: "20px", background: "var(--clr-bg)", borderRadius: "var(--radius-sm)", fontSize: "13px", color: "var(--clr-text-muted)" }}>
                  <p style={{ marginBottom: "8px", fontWeight: 500, color: "var(--clr-text)" }}>
                    Concierge Cash or Card on Delivery
                  </p>
                  <p>
                    For orders above ₹50,000, our secure armed courier will verify your government ID and OTP at handover. You may inspect the hallmark and diamond certificate before completing payment.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--clr-border)",
                borderRadius: "var(--radius-md)",
                padding: "28px",
                position: "sticky",
                top: "100px",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "20px" }}>Order Summary ({items.length})</h2>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "64px", height: "64px", position: "relative", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--clr-bg-alt)", flexShrink: 0 }}>
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", fontWeight: 500, lineHeight: 1.3 }}>{item.name}</div>
                      <div style={{ fontSize: "11px", color: "var(--clr-text-muted)", marginTop: "2px" }}>
                        {item.metal} • Size {item.size}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--clr-text-light)" }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo code */}
              <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                <input
                  type="text"
                  placeholder="Coupon code (WELCOME10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ flex: 1, padding: "10px 12px", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", fontSize: "13px", textTransform: "uppercase" }}
                />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ padding: "10px 16px", fontSize: "13px" }}
                >
                  Apply
                </button>
              </form>
              {appliedCoupon && (
                <div style={{ fontSize: "12px", color: "var(--clr-success)", marginBottom: "16px", display: "flex", justifyContent: "space-between" }}>
                  <span>✓ {appliedCoupon.code} applied ({appliedCoupon.discount}% OFF)</span>
                  <button type="button" onClick={() => setAppliedCoupon(null)} style={{ background: "none", border: "none", color: "var(--clr-sale)", cursor: "pointer", fontSize: "11px" }}>Remove</button>
                </div>
              )}
              {couponError && (
                <div style={{ fontSize: "12px", color: "var(--clr-sale)", marginBottom: "16px" }}>
                  {couponError}
                </div>
              )}

              {/* Price rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "16px 0", borderTop: "1px solid var(--clr-border-light)", borderBottom: "1px solid var(--clr-border-light)", fontSize: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--clr-text-muted)" }}>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--clr-success)" }}>
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--clr-text-muted)" }}>Insured Shipping</span>
                  <span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--clr-text-muted)" }}>GST (3% Jewelry)</span>
                  <span>{formatPrice(gstTax)}</span>
                </div>
              </div>

              {/* Total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "20px 0 24px" }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>Total Payable</div>
                  <div style={{ fontSize: "11px", color: "var(--clr-text-muted)" }}>Inclusive of all taxes & insurance</div>
                </div>
                <div style={{ fontSize: "22px", fontWeight: 600, color: "var(--clr-accent)" }}>
                  {formatPrice(total)}
                </div>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "15px",
                  fontWeight: 500,
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  opacity: isProcessing ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {isProcessing ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Securing Order & Payment...
                  </>
                ) : (
                  <>Place Order • {formatPrice(total)}</>
                )}
              </button>

              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px", color: "var(--clr-text-light)", textAlign: "center" }}>
                <div>🔒 100% Secure Checkout with Razorpay / BlueDart Integration</div>
                <div>✨ BIS Hallmarked & IGI / GIA Diamond Certified</div>
                <div>↺ 30-Day Complimentary Returns & Lifetime Atelier Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
