"use client";

import { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("newsletter-dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--clr-text-light)",
            fontSize: "20px",
          }}
          aria-label="Close popup"
        >
          ✕
        </button>

        <div style={{ marginBottom: "8px" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--clr-gold)" strokeWidth="1.2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>

        <h3
          style={{
            fontSize: "22px",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            marginBottom: "8px",
            color: "var(--clr-text)",
          }}
        >
          Unlock 10% Off
        </h3>

        <p
          style={{
            fontSize: "14px",
            color: "var(--clr-text-muted)",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}
        >
          Subscribe to receive exclusive offers, new arrival alerts, and 10% off your first order.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClose();
          }}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            type="email"
            className="input"
            placeholder="Enter your email address"
            required
            style={{ textAlign: "center" }}
          />
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Get My 10% Off
          </button>
        </form>

        <p style={{ fontSize: "11px", color: "var(--clr-text-light)", marginTop: "16px" }}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
