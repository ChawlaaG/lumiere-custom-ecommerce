"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 50000;

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, itemCount, subtotal } = useCart();

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {/* Backdrop overlay */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(17, 24, 39, 0.45)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          animation: "cartFadeIn 250ms ease-out",
        }}
      />

      {/* Slide-out Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "460px",
          height: "100dvh",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 36px rgba(0, 0, 0, 0.16)",
          zIndex: 10000,
          animation: "cartSlideIn 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--clr-border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>🛍️</span>
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: 500, letterSpacing: "-0.01em", margin: 0, color: "var(--clr-text)" }}>
                Shopping Bag
              </h2>
              <span style={{ fontSize: "12px", color: "var(--clr-text-muted)" }}>
                {itemCount} {itemCount === 1 ? "Fine Piece" : "Fine Pieces"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close Shopping Bag"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid var(--clr-border)",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "16px",
              color: "var(--clr-text)",
              transition: "all 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--clr-bg-alt)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div
          style={{
            background: "var(--clr-bg)",
            padding: "12px 24px",
            borderBottom: "1px solid var(--clr-border-light)",
          }}
        >
          <div style={{ fontSize: "12px", color: "var(--clr-text)", marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
            {remainingForFreeShipping === 0 ? (
              <span style={{ color: "var(--clr-success)", fontWeight: 600 }}>
                ✨ Complimentary Insured Air Delivery Unlocked!
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(remainingForFreeShipping)}</strong> for Free Express Delivery
              </span>
            )}
            <span style={{ fontSize: "11px", color: "var(--clr-text-muted)", fontWeight: 600 }}>
              {progressPercent}%
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "5px",
              background: "#e8e4de",
              borderRadius: "100px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: progressPercent >= 100 ? "var(--clr-success)" : "var(--clr-gold)",
                borderRadius: "100px",
                transition: "width 300ms ease",
              }}
            />
          </div>
        </div>

        {/* Items List Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                padding: "32px 0",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "var(--clr-bg-alt)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  marginBottom: "16px",
                }}
              >
                💎
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 400, marginBottom: "8px" }}>
                Your shopping bag is empty
              </h3>
              <p style={{ color: "var(--clr-text-muted)", fontSize: "13px", maxWidth: "260px", marginBottom: "24px", lineHeight: 1.5 }}>
                Discover our ethically handcrafted engagement rings and bridal creations.
              </p>
              <Link
                href="/collections/engagement-rings"
                onClick={closeCart}
                className="btn btn-primary"
                style={{ padding: "12px 24px", fontSize: "13px" }}
              >
                Explore Engagement Rings
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--clr-border-light)",
                  alignItems: "flex-start",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "74px",
                    height: "74px",
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "var(--clr-bg-alt)",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="74px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                    <h4
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: 1.3,
                        margin: 0,
                        color: "var(--clr-text)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--clr-text-light)",
                        cursor: "pointer",
                        padding: "2px",
                        fontSize: "13px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clr-sale)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--clr-text-light)")}
                    >
                      ✕
                    </button>
                  </div>

                  <div style={{ fontSize: "12px", color: "var(--clr-text-muted)", marginTop: "4px" }}>
                    {item.variant}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "12px",
                    }}
                  >
                    {/* Quantity controls */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid var(--clr-border)",
                        borderRadius: "6px",
                        background: "var(--clr-bg)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "none",
                          background: "none",
                          fontSize: "14px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--clr-text)",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          minWidth: "24px",
                          textAlign: "center",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "none",
                          background: "none",
                          fontSize: "14px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--clr-text)",
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--clr-text)" }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (Sticky Checkout) */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid var(--clr-border-light)",
              background: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* Subtotal row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <span style={{ fontSize: "14px", color: "var(--clr-text-muted)" }}>Subtotal</span>
                <div style={{ fontSize: "11px", color: "var(--clr-text-light)" }}>
                  Inclusive of all taxes & insurance
                </div>
              </div>
              <span style={{ fontSize: "20px", fontWeight: 600, color: "var(--clr-accent)" }}>
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  padding: "15px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                Proceed to Checkout • {formatPrice(subtotal)}
              </Link>

              <Link
                href="/cart"
                onClick={closeCart}
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "12px",
                  textAlign: "center",
                  color: "var(--clr-text-muted)",
                }}
              >
                View Full Shopping Bag Page
              </Link>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                fontSize: "10px",
                color: "var(--clr-text-light)",
                textAlign: "center",
                paddingTop: "4px",
              }}
            >
              <span>🔒 256-Bit SSL</span>
              <span>•</span>
              <span>✨ BIS Hallmarked</span>
              <span>•</span>
              <span>↺ 30-Day Returns</span>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes cartFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cartSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
