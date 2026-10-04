"use client";

import { useState } from "react";
import { formatPrice } from "@/data/products";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  variant: string;
  stock: number;
  lowStockThreshold: number;
  price: number;
  location: string;
  lastUpdated: string;
}

const initialInventory: InventoryItem[] = [
  { id: "inv-1", name: "Lumière Solitaire Ring", sku: "ECK-SOL-18Y-6", variant: "18k Yellow Gold / Size 6", stock: 1, lowStockThreshold: 3, price: 85000, location: "Mumbai Safe A", lastUpdated: "Today, 10:15 AM" },
  { id: "inv-2", name: "Lumière Solitaire Ring", sku: "ECK-SOL-18Y-65", variant: "18k Yellow Gold / Size 6.5", stock: 4, lowStockThreshold: 3, price: 85000, location: "Mumbai Safe A", lastUpdated: "Yesterday" },
  { id: "inv-3", name: "Lumière Solitaire Ring", sku: "ECK-SOL-18W-6", variant: "18k White Gold / Size 6", stock: 2, lowStockThreshold: 3, price: 85000, location: "Mumbai Safe A", lastUpdated: "Oct 01, 2024" },
  { id: "inv-4", name: "Pavé Diamond Wedding Band", sku: "ECK-BAN-PAV-18Y", variant: "18k Yellow Gold / Size 6", stock: 5, lowStockThreshold: 3, price: 42000, location: "Mumbai Safe B", lastUpdated: "Oct 02, 2024" },
  { id: "inv-5", name: "Pavé Diamond Wedding Band", sku: "ECK-BAN-PAV-18R", variant: "18k Rose Gold / Size 6.5", stock: 2, lowStockThreshold: 5, price: 42000, location: "Mumbai Safe B", lastUpdated: "Today, 08:30 AM" },
  { id: "inv-6", name: "Diamond Solitaire Studs", sku: "ECK-STU-050-14W", variant: "14k White Gold / 0.50 ct", stock: 1, lowStockThreshold: 4, price: 48000, location: "Atelier Vault 1", lastUpdated: "Sep 28, 2024" },
  { id: "inv-7", name: "Diamond Eternity Ring", sku: "ECK-ETR-18R-7", variant: "18k Rose Gold / Size 7", stock: 3, lowStockThreshold: 3, price: 95000, location: "Atelier Vault 2", lastUpdated: "Sep 29, 2024" },
  { id: "inv-8", name: "Three-Stone Diamond Ring", sku: "ECK-TRI-18W-65", variant: "18k White Gold / Size 6.5", stock: 3, lowStockThreshold: 2, price: 110000, location: "Mumbai Safe A", lastUpdated: "Oct 03, 2024" },
];

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialInventory);
  const [filterLowOnly, setFilterLowOnly] = useState(false);
  const [search, setSearch] = useState("");

  const updateStock = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta), lastUpdated: "Just now" } : item
      )
    );
  };

  const filtered = items.filter((item) => {
    const isLow = item.stock <= item.lowStockThreshold;
    const matchesFilter = filterLowOnly ? isLow : true;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase()) || item.variant.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const lowStockCount = items.filter((i) => i.stock <= i.lowStockThreshold).length;

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Variant-Level Atelier Inventory</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Track carat weights, gold karat alloy stocks, ring sizes, and trigger casting orders
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Batch casting notification sent to Master Goldsmith atelier.")}
          style={{
            padding: "9px 16px",
            background: "#b69d74",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ✨ Request Workshop Casting Run
        </button>
      </div>

      {/* Control Bar */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "16px 20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <input
          type="text"
          placeholder="Filter by SKU, ring size, or metal..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "9px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            fontSize: "13px",
            width: "320px",
          }}
        />

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 500, color: "#334155", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={filterLowOnly}
              onChange={(e) => setFilterLowOnly(e.target.checked)}
            />
            Show Low Stock Only ({lowStockCount})
          </label>
        </div>
      </div>

      {/* Inventory Table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}>
                <th style={{ padding: "12px 16px" }}>Jewelry Piece & Variant</th>
                <th style={{ padding: "12px 16px" }}>SKU Code</th>
                <th style={{ padding: "12px 16px" }}>Vault Location</th>
                <th style={{ padding: "12px 16px" }}>Unit Value</th>
                <th style={{ padding: "12px 16px" }}>Live Stock</th>
                <th style={{ padding: "12px 16px" }}>Threshold</th>
                <th style={{ padding: "12px 16px" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>Adjust Count</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isCritical = item.stock <= 1;
                const isLow = item.stock <= item.lowStockThreshold;

                return (
                  <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: 600, color: "#0f172a" }}>{item.name}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{item.variant}</div>
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "monospace", color: "#475569" }}>
                      {item.sku}
                    </td>
                    <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "12px" }}>
                      {item.location}
                    </td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>
                      {formatPrice(item.price)}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: isCritical ? "#e11d48" : isLow ? "#b45309" : "#0f172a" }}>
                        {item.stock} Units
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#94a3b8" }}>
                      Min: {item.lowStockThreshold}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {isCritical ? (
                        <span style={{ background: "#fee2e2", color: "#b91c1c", padding: "3px 8px", borderRadius: "100px", fontSize: "10px", fontWeight: 700 }}>
                          CRITICAL LOW
                        </span>
                      ) : isLow ? (
                        <span style={{ background: "#fef3c7", color: "#b45309", padding: "3px 8px", borderRadius: "100px", fontSize: "10px", fontWeight: 700 }}>
                          LOW STOCK
                        </span>
                      ) : (
                        <span style={{ background: "#dcfce7", color: "#15803d", padding: "3px 8px", borderRadius: "100px", fontSize: "10px", fontWeight: 700 }}>
                          IN STOCK
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                        <button
                          type="button"
                          onClick={() => updateStock(item.id, -1)}
                          style={{ width: "28px", height: "28px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", cursor: "pointer", fontWeight: 700 }}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStock(item.id, 1)}
                          style={{ width: "28px", height: "28px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", cursor: "pointer", fontWeight: 700 }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
