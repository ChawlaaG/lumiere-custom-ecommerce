"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products & Catalog", icon: "💍" },
  { href: "/admin/orders", label: "Orders & Fulfillment", icon: "📦", badge: "4" },
  { href: "/admin/inventory", label: "Inventory & Alerts", icon: "🏷️", badge: "3" },
  { href: "/admin/customers", label: "Customer CRM", icon: "👥" },
  { href: "/admin/coupons", label: "Coupons & Discounts", icon: "🎟️" },
  { href: "/admin/analytics", label: "Reports & Analytics", icon: "📈" },
  { href: "/admin/shipping", label: "Shiprocket Logistics", icon: "🚚" },
  { href: "/admin/team", label: "Team & Role Access", icon: "🛡️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<"Super Administrator" | "Store Manager">("Super Administrator");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa", fontFamily: "var(--font-sans, system-ui, sans-serif)", color: "#1e293b" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarCollapsed ? "72px" : "260px",
          background: "#111827",
          color: "#f9fafb",
          borderRight: "1px solid #1f2937",
          display: "flex",
          flexDirection: "column",
          transition: "width 200ms ease",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 100,
          flexShrink: 0,
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #1f2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.08em", color: "#f3f4f6", textTransform: "uppercase" }}>
                LUMIÈRE
              </div>
              <div style={{ fontSize: "10px", color: "#b69d74", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                ATELIER ADMIN SUITE
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              background: "none",
              border: "none",
              color: "#9ca3af",
              cursor: "pointer",
              padding: "4px",
              fontSize: "14px",
              marginLeft: sidebarCollapsed ? "auto" : "0",
              marginRight: sidebarCollapsed ? "auto" : "0",
            }}
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? "▶" : "◀"}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "16px 12px", flex: 1, display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#ffffff" : "#9ca3af",
                  background: isActive ? "rgba(182, 157, 116, 0.2)" : "transparent",
                  borderLeft: isActive ? "3px solid #b69d74" : "3px solid transparent",
                  textDecoration: "none",
                  transition: "all 150ms ease",
                  justifyContent: sidebarCollapsed ? "center" : "flex-start",
                }}
                title={item.label}
              >
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                {!sidebarCollapsed && (
                  <>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span
                        style={{
                          background: item.badge === "3" ? "#ef4444" : "#b69d74",
                          color: "#fff",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: "100px",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Role & Switcher Footer */}
        <div style={{ padding: "16px", borderTop: "1px solid #1f2937", background: "#0b0f19" }}>
          {!sidebarCollapsed && (
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Active Role
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                style={{
                  width: "100%",
                  background: "#1f2937",
                  color: "#f3f4f6",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                  padding: "6px 8px",
                  fontSize: "11px",
                  cursor: "pointer",
                }}
              >
                <option value="Super Administrator">👑 Super Administrator</option>
                <option value="Store Manager">👔 Store Manager</option>
              </select>
            </div>
          )}
          <Link
            href="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "6px",
              background: "#1f2937",
              color: "#e5e7eb",
              fontSize: "12px",
              textDecoration: "none",
              fontWeight: 500,
              width: "100%",
              textAlign: "center",
            }}
          >
            <span>↗</span> {!sidebarCollapsed && "View Live Storefront"}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowX: "hidden" }}>
        {/* Top Header */}
        <header
          style={{
            height: "64px",
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 90,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                background: "#f1f5f9",
                color: "#475569",
                fontSize: "11px",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "100px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Role: {role}
            </span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>
              Atelier Production Database • Live API Sync
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#16a34a", fontWeight: 500 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
              Shiprocket & Razorpay Webhooks Active
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderLeft: "1px solid #e2e8f0", paddingLeft: "20px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "#111827",
                  color: "#b69d74",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                SA
              </div>
              <div style={{ fontSize: "12px" }}>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>Super Admin</div>
                <div style={{ color: "#64748b", fontSize: "11px" }}>admin@lumiere.com</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "32px", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
