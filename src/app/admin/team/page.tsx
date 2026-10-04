"use client";

import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Super Administrator" | "Store Manager" | "Concierge Support";
  status: "Active" | "Pending";
  lastActive: string;
}

const initialTeam: TeamMember[] = [
  { id: "tm-1", name: "Ananya Mehta", email: "ananya@lumiere.com", role: "Super Administrator", status: "Active", lastActive: "Just now" },
  { id: "tm-2", name: "Kabir Khanna", email: "kabir.k@lumiere.com", role: "Store Manager", status: "Active", lastActive: "15 mins ago" },
  { id: "tm-3", name: "Zoya Alvi", email: "zoya.a@lumiere.com", role: "Concierge Support", status: "Active", lastActive: "1 hour ago" },
  { id: "tm-4", name: "Dev Patel", email: "dev.p@lumiere.com", role: "Store Manager", status: "Pending", lastActive: "Invited" },
];

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Store Manager");

  const [permissions, setPermissions] = useState({
    "Store Manager": {
      products: true,
      orders: true,
      inventory: true,
      customers: true,
      reports: true,
      shipping: true,
      coupons: true,
      teamSettings: false,
    },
    "Concierge Support": {
      products: true,
      orders: true,
      inventory: false,
      customers: true,
      reports: false,
      shipping: false,
      coupons: false,
      teamSettings: false,
    },
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
      lastActive: "Invited",
    };

    setTeam([...team, newMember]);
    setShowInviteModal(false);
    setInviteName("");
    setInviteEmail("");
    alert(`Invitation link generated and dispatched to ${inviteEmail}!`);
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Team Members & Role-Based Access (RBAC)</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Manage staff credentials, granular module permissions, and audit logs
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowInviteModal(true)}
          style={{
            padding: "10px 18px",
            background: "#0f172a",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>+</span> Invite Staff Member
        </button>
      </div>

      {/* Team Members Table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: "36px" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>Authorized Team Members ({team.length})</h2>
          <span style={{ fontSize: "12px", color: "#64748b" }}>2FA Enforced for all Super Admins</span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}>
                <th style={{ padding: "12px 16px" }}>Member</th>
                <th style={{ padding: "12px 16px" }}>Assigned Role</th>
                <th style={{ padding: "12px 16px" }}>Account Status</th>
                <th style={{ padding: "12px 16px" }}>Last Activity</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>{member.name}</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{member.email}</div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background:
                          member.role === "Super Administrator"
                            ? "#1e293b"
                            : member.role === "Store Manager"
                            ? "rgba(182, 157, 116, 0.2)"
                            : "#f1f5f9",
                        color:
                          member.role === "Super Administrator"
                            ? "#f8fafc"
                            : member.role === "Store Manager"
                            ? "#8b7355"
                            : "#475569",
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      {member.role === "Super Administrator" ? "👑 " : member.role === "Store Manager" ? "👔 " : "💬 "}
                      {member.role}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background: member.status === "Active" ? "#dcfce7" : "#fef3c7",
                        color: member.status === "Active" ? "#15803d" : "#b45309",
                        padding: "3px 8px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      ● {member.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#64748b" }}>{member.lastActive}</td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    {member.role !== "Super Administrator" ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Revoke access for ${member.name}?`)) {
                            setTeam(team.filter((t) => t.id !== member.id));
                          }
                        }}
                        style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                      >
                        Revoke
                      </button>
                    ) : (
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>Primary Owner</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permission Matrix */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Granular Permission Matrix</h2>
        <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>
          Super Admins retain full rights. Adjust permissions for Store Managers and Concierge Staff below:
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}>
                <th style={{ padding: "10px 14px" }}>Module</th>
                <th style={{ padding: "10px 14px" }}>Super Admin</th>
                <th style={{ padding: "10px 14px" }}>Store Manager</th>
                <th style={{ padding: "10px 14px" }}>Concierge Support</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: "products", label: "Product & Variant Editing" },
                { key: "orders", label: "Orders & Status Processing" },
                { key: "inventory", label: "Stock Adjustment & Casting Orders" },
                { key: "customers", label: "Customer CRM & Contact Info" },
                { key: "reports", label: "Financial Reports & Revenue Analytics" },
                { key: "shipping", label: "Shiprocket AWB & Logistics Sync" },
                { key: "coupons", label: "Promotions & Coupon Engine" },
                { key: "teamSettings", label: "Team Management & Security Roles" },
              ].map((row) => (
                <tr key={row.key} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 14px", fontWeight: 600, color: "#1e293b" }}>{row.label}</td>
                  <td style={{ padding: "12px 14px", color: "#16a34a", fontWeight: 700 }}>✓ Full Access</td>
                  <td style={{ padding: "12px 14px" }}>
                    <input
                      type="checkbox"
                      checked={(permissions["Store Manager"] as any)[row.key]}
                      onChange={(e) =>
                        setPermissions({
                          ...permissions,
                          "Store Manager": {
                            ...permissions["Store Manager"],
                            [row.key]: e.target.checked,
                          },
                        })
                      }
                      style={{ cursor: "pointer", width: "16px", height: "16px" }}
                    />
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <input
                      type="checkbox"
                      checked={(permissions["Concierge Support"] as any)[row.key]}
                      onChange={(e) =>
                        setPermissions({
                          ...permissions,
                          "Concierge Support": {
                            ...permissions["Concierge Support"],
                            [row.key]: e.target.checked,
                          },
                        })
                      }
                      style={{ cursor: "pointer", width: "16px", height: "16px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
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
              maxWidth: "460px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>Invite Team Member</h2>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#94a3b8" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInvite} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Staff Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Verma"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="siddharth@lumiere.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Assigned Security Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", background: "#fff" }}
                >
                  <option value="Store Manager">Store Manager (Products, Orders, CRM, Logistics)</option>
                  <option value="Concierge Support">Concierge Support (Orders & CRM lookup only)</option>
                  <option value="Super Administrator">Super Administrator (Full System Unrestricted Access)</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "#0f172a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Send Invitation
                </button>
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  style={{
                    padding: "12px 20px",
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
