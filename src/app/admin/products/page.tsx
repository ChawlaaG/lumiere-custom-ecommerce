"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products as initialProducts, formatPrice } from "@/data/products";

export default function AdminProductsPage() {
  const [productList, setProductList] = useState(
    initialProducts.map((p) => ({
      ...p,
      sku: p.variants[0]?.sku || `ECK-${p.slug.slice(0, 4).toUpperCase()}-01`,
      stock: p.variants.reduce((sum, v) => sum + v.stock, 0) || 5,
      status: "Active" as "Active" | "Draft",
    }))
  );

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("engagement-rings");
  const [newPrice, setNewPrice] = useState("");
  const [newComparePrice, setNewComparePrice] = useState("");
  const [newSku, setNewSku] = useState("");
  const [newStock, setNewStock] = useState("5");
  const [newBadge, setNewBadge] = useState<string>("new");

  const handleStockChange = (id: string, delta: number) => {
    setProductList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + delta);
          return { ...item, stock: newStock, inStock: newStock > 0 };
        }
        return item;
      })
    );
  };

  const toggleStatus = (id: string) => {
    setProductList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: item.status === "Active" ? "Draft" : "Active" } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to archive this jewelry piece?")) {
      setProductList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice) return;

    const newProd = {
      id: `prod-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: newTitle,
      description: "Handcrafted in our zero-waste atelier using 100% recycled 18k solid gold and conflict-free diamonds.",
      shortDescription: "Timeless artisanal jewelry crafted to perfection.",
      category: newCategory,
      subcategory: "solitaire",
      price: Number(newPrice),
      comparePrice: newComparePrice ? Number(newComparePrice) : undefined,
      images: ["/images/hero-ring.jpg", "/images/collection-hero.jpg"],
      variants: [],
      specifications: { "Metal": "18k Solid Gold", "Gemstone": "Certified Lab Diamond" },
      badge: (newBadge === "none" ? undefined : newBadge) as any,
      rating: 5,
      reviewCount: 1,
      inStock: Number(newStock) > 0,
      shipsIn: "Ships in 24 hours",
      featured: true,
      createdAt: new Date().toISOString(),
      sku: newSku || `ECK-${newTitle.slice(0, 4).toUpperCase()}-01`,
      stock: Number(newStock) || 0,
      status: "Active" as const,
    };

    setProductList([newProd, ...productList]);
    setShowAddModal(false);
    setNewTitle("");
    setNewPrice("");
    setNewComparePrice("");
    setNewSku("");
    setNewStock("5");
  };

  const filtered = productList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Product Catalog & Inventory</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Manage jewelry items, metal variations, pricing, and live atelier stock
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
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
          <span>+</span> Add New Jewelry Piece
        </button>
      </div>

      {/* Filter and Search Bar */}
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
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1, maxWidth: "500px" }}>
          <input
            type="text"
            placeholder="Search by name, gemstone, or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "13px",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: "9px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "13px",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="all">All Categories ({productList.length})</option>
            <option value="engagement-rings">Engagement Rings</option>
            <option value="wedding-bands">Wedding Bands</option>
            <option value="necklaces">Necklaces</option>
            <option value="earrings">Earrings</option>
            <option value="bracelets">Bracelets</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}>
                <th style={{ padding: "12px 16px" }}>Piece</th>
                <th style={{ padding: "12px 16px" }}>SKU</th>
                <th style={{ padding: "12px 16px" }}>Category</th>
                <th style={{ padding: "12px 16px" }}>Price</th>
                <th style={{ padding: "12px 16px" }}>Atelier Stock</th>
                <th style={{ padding: "12px 16px" }}>Badge</th>
                <th style={{ padding: "12px 16px" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "44px", height: "44px", position: "relative", borderRadius: "6px", overflow: "hidden", background: "#f1f5f9", flexShrink: 0 }}>
                        <Image src={item.images[0] || "/images/hero-ring.jpg"} alt={item.name} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "#0f172a" }}>{item.name}</div>
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>{item.shipsIn}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: "12px", color: "#475569" }}>
                    {item.sku}
                  </td>
                  <td style={{ padding: "14px 16px", color: "#64748b", textTransform: "capitalize" }}>
                    {item.category.replace("-", " ")}
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>
                    {formatPrice(item.price)}
                    {item.comparePrice && (
                      <span style={{ fontSize: "11px", color: "#94a3b8", textDecoration: "line-through", marginLeft: "6px" }}>
                        {formatPrice(item.comparePrice)}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() => handleStockChange(item.id, -1)}
                        style={{ width: "24px", height: "24px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: "28px", textAlign: "center", fontWeight: 600, color: item.stock <= 2 ? "#e11d48" : "#0f172a" }}>
                        {item.stock}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleStockChange(item.id, 1)}
                        style={{ width: "24px", height: "24px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    {item.badge ? (
                      <span
                        style={{
                          background: item.badge === "sale" ? "#fee2e2" : item.badge === "bestseller" ? "#1e293b" : "#fef3c7",
                          color: item.badge === "sale" ? "#b91c1c" : item.badge === "bestseller" ? "#f8fafc" : "#b45309",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "100px",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.badge}
                      </span>
                    ) : (
                      <span style={{ color: "#cbd5e1" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <button
                      type="button"
                      onClick={() => toggleStatus(item.id)}
                      style={{
                        background: item.status === "Active" ? "#dcfce7" : "#f1f5f9",
                        color: item.status === "Active" ? "#15803d" : "#64748b",
                        border: "none",
                        borderRadius: "100px",
                        padding: "3px 10px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      ● {item.status}
                    </button>
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                      <Link
                        href={`/product/${item.slug}`}
                        target="_blank"
                        style={{ color: "#3b82f6", fontSize: "12px", textDecoration: "none", fontWeight: 500 }}
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", cursor: "pointer", fontWeight: 500 }}
                      >
                        Archive
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Product Modal */}
      {showAddModal && (
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
              maxWidth: "560px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>Add Handcrafted Jewelry Piece</h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#94a3b8" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oval Secret Heart Solitaire Ring"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", background: "#fff" }}
                  >
                    <option value="engagement-rings">Engagement Rings</option>
                    <option value="wedding-bands">Wedding Bands</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="earrings">Earrings</option>
                    <option value="bracelets">Bracelets</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    SKU Code
                  </label>
                  <input
                    type="text"
                    placeholder="ECK-RNG-08"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="85000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Compare Price (MRP)
                  </label>
                  <input
                    type="number"
                    placeholder="95000"
                    value={newComparePrice}
                    onChange={(e) => setNewComparePrice(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Initial Stock Count
                  </label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Badge Tag
                  </label>
                  <select
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", background: "#fff" }}
                  >
                    <option value="none">No Badge</option>
                    <option value="new">New Arrival</option>
                    <option value="bestseller">Bestseller</option>
                    <option value="sale">Sale / Offer</option>
                  </select>
                </div>
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
                  Publish to Catalog
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
