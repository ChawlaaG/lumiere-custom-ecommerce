"use client";

import { use, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { categories, getProductsByCategory, products } from "@/data/products";
import Link from "next/link";

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = getProductsByCategory(slug);
  const displayProducts = categoryProducts.length > 0 ? categoryProducts : products;

  const [sortBy, setSortBy] = useState("featured");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");

  const filtered = selectedSubcategory === "all"
    ? displayProducts
    : displayProducts.filter((p) => p.subcategory === selectedSubcategory);

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "rating": return b.rating - a.rating;
      default: return 0;
    }
  });

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ padding: "16px 0", borderBottom: "1px solid var(--clr-border-light)" }}>
        <div className="container">
          <nav style={{ fontSize: "12px", color: "var(--clr-text-light)", display: "flex", gap: "8px", alignItems: "center" }}>
            <Link href="/" style={{ color: "var(--clr-text-light)" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "var(--clr-text)" }}>{category?.name || "All Collections"}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section style={{ paddingBottom: 0 }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "8px" }}>
            {category?.name || "All Collections"}
          </h1>
          <p style={{ fontSize: "15px", maxWidth: "520px", color: "var(--clr-text-muted)" }}>
            {category?.description || "Explore our complete collection of handcrafted fine jewelry"}
          </p>
        </div>
      </section>

      {/* Filters & Sort Bar */}
      <section style={{ paddingTop: "16px", paddingBottom: 0 }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              paddingBottom: "24px",
              borderBottom: "1px solid var(--clr-border-light)",
            }}
          >
            {/* Subcategory Filters */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => setSelectedSubcategory("all")}
                className={`btn btn-sm ${selectedSubcategory === "all" ? "btn-primary" : "btn-secondary"}`}
                style={{ fontSize: "12px", padding: "8px 16px" }}
              >
                All ({displayProducts.length})
              </button>
              {category?.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcategory(sub.slug)}
                  className={`btn btn-sm ${selectedSubcategory === sub.slug ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: "12px", padding: "8px 16px" }}
                >
                  {sub.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "var(--clr-text-light)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Sort by
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
                style={{ width: "auto", padding: "8px 12px", fontSize: "13px" }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section>
        <div className="container">
          <div className="product-grid">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {sorted.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <p style={{ fontSize: "16px", color: "var(--clr-text-muted)" }}>
                No products found in this subcategory.
              </p>
              <button
                onClick={() => setSelectedSubcategory("all")}
                className="btn btn-secondary"
                style={{ marginTop: "16px" }}
              >
                Show All
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
