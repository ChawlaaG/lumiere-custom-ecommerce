"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/collections/engagement-rings", label: "Engagement Rings" },
  { href: "/collections/wedding-bands", label: "Wedding Bands" },
  { href: "/collections/necklaces", label: "Necklaces" },
  { href: "/collections/earrings", label: "Earrings" },
  { href: "/collections/bracelets", label: "Bracelets" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div
        style={{
          background: "var(--clr-bg-dark)",
          color: "var(--clr-text-inverse)",
          fontSize: "12px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "8px 24px",
          fontWeight: 400,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          Complimentary insured shipping on all orders · Lab-grown diamonds · Ethically crafted
        </div>
        <Link
          href="/admin"
          style={{
            color: "var(--clr-gold)",
            textDecoration: "none",
            fontSize: "11px",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            background: "rgba(255,255,255,0.08)",
            padding: "2px 8px",
            borderRadius: "4px",
          }}
        >
          ⚙️ Admin Portal
        </Link>
      </div>

      {/* Main Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(250, 249, 247, 0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--clr-border-light)",
        }}
      >
        <div
          className="container-wide"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "var(--clr-text)",
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: "24px",
              fontWeight: 300,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--clr-text)",
            }}
          >
            Lumière
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{ display: "flex", gap: "32px", alignItems: "center" }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  color: "var(--clr-text-muted)",
                  transition: "color 200ms",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clr-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--clr-text-muted)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="btn-icon"
              style={{ width: "40px", height: "40px", border: "none", background: "transparent" }}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="btn-icon"
              style={{ width: "40px", height: "40px", border: "none", background: "transparent" }}
              aria-label="Account"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Wishlist */}
            <Link
              href="/account"
              className="btn-icon"
              style={{ width: "40px", height: "40px", border: "none", background: "transparent" }}
              aria-label="Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="btn-icon"
              style={{
                width: "40px",
                height: "40px",
                border: "none",
                background: "transparent",
                position: "relative",
              }}
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "var(--clr-bg-dark)",
                  color: "white",
                  fontSize: "9px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                2
              </span>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid var(--clr-border-light)",
              animation: "slideUp 300ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="container">
              <input
                type="search"
                className="input"
                placeholder="Search for rings, necklaces, earrings..."
                autoFocus
                style={{ fontSize: "16px", padding: "14px 20px" }}
              />
            </div>
          </div>
        )}

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav
            className="mobile-nav"
            style={{
              padding: "16px 0 24px",
              borderTop: "1px solid var(--clr-border-light)",
              display: "flex",
              flexDirection: "column",
              gap: "0",
              animation: "slideUp 300ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "14px 24px",
                  fontSize: "14px",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  color: "var(--clr-text)",
                  textTransform: "uppercase",
                  borderBottom: "1px solid var(--clr-border-light)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
