"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/data/products";

const initialCart = [
  {
    id: "cart-1",
    productId: "prod-1",
    name: "Aurora Solitaire Ring",
    variant: "18K Yellow Gold",
    price: 185000,
    comparePrice: 210000,
    quantity: 1,
    image: "/images/hero-ring.jpg",
    sku: "AUR-YG-001",
  },
  {
    id: "cart-2",
    productId: "prod-4",
    name: "Lumière Pendant Necklace",
    variant: "18K Rose Gold",
    price: 70000,
    quantity: 1,
    image: "/images/collection-hero.jpg",
    sku: "LUM-RG-001",
  },
];

export default function CartPage() {
  const [items, setItems] = useState(initialCart);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = 0; // free shipping
  const tax = Math.round((subtotal - discount) * 0.03);
  const total = subtotal - discount + shipping + tax;

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <section style={{ paddingTop: "32px" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: "32px" }}>
            Your Cart ({items.length})
          </h1>

          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--clr-text-light)" strokeWidth="1.2" style={{ margin: "0 auto 16px" }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>Your cart is empty</h2>
              <p style={{ color: "var(--clr-text-muted)", marginBottom: "24px" }}>Discover something beautiful today</p>
              <Link href="/" className="btn btn-primary">Continue Shopping</Link>
            </div>
          ) : (
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "48px", alignItems: "start" }}
              className="cart-grid"
            >
              {/* Cart Items */}
              <div>
                {/* Table header */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 1fr 1fr 1fr auto",
                    gap: "16px",
                    paddingBottom: "12px",
                    borderBottom: "1px solid var(--clr-border)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--clr-text-light)",
                  }}
                  className="cart-header"
                >
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span />
                </div>

                {/* Items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3fr 1fr 1fr 1fr auto",
                      gap: "16px",
                      padding: "24px 0",
                      borderBottom: "1px solid var(--clr-border-light)",
                      alignItems: "center",
                    }}
                    className="cart-item"
                  >
                    {/* Product */}
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <div
                        style={{
                          position: "relative",
                          width: "80px",
                          height: "80px",
                          borderRadius: "var(--radius-sm)",
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "var(--clr-bg-alt)",
                        }}
                      >
                        <Image src={item.image} alt={item.name} fill sizes="80px" style={{ objectFit: "cover" }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "15px", fontWeight: 400, marginBottom: "4px" }}>{item.name}</h3>
                        <p style={{ fontSize: "12px", color: "var(--clr-text-light)" }}>{item.variant}</p>
                        <p style={{ fontSize: "11px", color: "var(--clr-text-light)" }}>SKU: {item.sku}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <span style={{ fontSize: "14px" }}>{formatPrice(item.price)}</span>
                      {item.comparePrice && (
                        <span style={{ display: "block", fontSize: "12px", color: "var(--clr-text-light)", textDecoration: "line-through" }}>
                          {formatPrice(item.comparePrice)}
                        </span>
                      )}
                    </div>

                    {/* Quantity */}
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", width: "fit-content" }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width: "32px", height: "32px", border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}
                      >
                        −
                      </button>
                      <span style={{ width: "28px", textAlign: "center", fontSize: "13px" }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: "32px", height: "32px", border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}
                      >
                        +
                      </button>
                    </div>

                    {/* Total */}
                    <span style={{ fontSize: "15px", fontWeight: 500 }}>{formatPrice(item.price * item.quantity)}</span>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--clr-text-light)", padding: "4px" }}
                      aria-label="Remove item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}

                <div style={{ marginTop: "16px" }}>
                  <Link href="/" style={{ fontSize: "13px", color: "var(--clr-accent)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div
                style={{
                  background: "var(--clr-surface)",
                  border: "1px solid var(--clr-border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "32px",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: 500, marginBottom: "24px", letterSpacing: "-0.01em" }}>
                  Order Summary
                </h3>

                {/* Coupon */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      style={{ fontSize: "13px" }}
                    />
                    <button
                      onClick={() => {
                        if (coupon.toUpperCase() === "WELCOME10") setCouponApplied(true);
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p style={{ fontSize: "12px", color: "var(--clr-success)", marginTop: "8px" }}>
                      ✓ WELCOME10 applied — 10% off
                    </p>
                  )}
                  <p style={{ fontSize: "11px", color: "var(--clr-text-light)", marginTop: "4px" }}>
                    Try: WELCOME10
                  </p>
                </div>

                {/* Totals */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--clr-text-muted)" }}>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--clr-success)" }}>
                      <span>Discount (10%)</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--clr-text-muted)" }}>Shipping</span>
                    <span style={{ color: "var(--clr-success)" }}>Free</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--clr-text-muted)" }}>Estimated Tax (3%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div style={{ height: "1px", background: "var(--clr-border)", margin: "4px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 500 }}>
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "24px" }}
                >
                  Proceed to Checkout
                </Link>

                <div style={{ textAlign: "center", marginTop: "16px", fontSize: "11px", color: "var(--clr-text-light)" }}>
                  🔒 Secure checkout · 256-bit SSL encrypted
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
          .cart-header { display: none !important; }
          .cart-item {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
