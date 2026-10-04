"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProductBySlug, products, reviews, formatPrice } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

function StarIcon({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#d4a847" : "none"} stroke="#d4a847" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const product = getProductBySlug(slug);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  const handleAddToCart = () => {
    if (!product) return;
    const currentVariant = product.variants[selectedVariant];
    addToCart({
      productId: product.id,
      name: product.name,
      variant: `${currentVariant.name} • Size 6 (US)`,
      price: currentVariant.price,
      comparePrice: currentVariant.comparePrice,
      quantity,
      image: product.images[0] || "/images/hero-ring.jpg",
      sku: currentVariant.sku,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  if (!product) {
    return (
      <div className="container" style={{ padding: "120px 0", textAlign: "center" }}>
        <h1>Product not found</h1>
        <Link href="/" className="btn btn-primary" style={{ marginTop: "24px" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discountPercent = variant.comparePrice
    ? Math.round(((variant.comparePrice - variant.price) / variant.comparePrice) * 100)
    : 0;

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ padding: "16px 0", borderBottom: "1px solid var(--clr-border-light)" }}>
        <div className="container">
          <nav style={{ fontSize: "12px", color: "var(--clr-text-light)", display: "flex", gap: "8px", alignItems: "center" }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/collections/${product.category}`} style={{ textTransform: "capitalize" }}>
              {product.category.replace(/-/g, " ")}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--clr-text)" }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section>
        <div className="container">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}
            className="product-detail-grid"
          >
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  background: "var(--clr-bg-alt)",
                  marginBottom: "12px",
                }}
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="50vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                {product.badge && (
                  <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                    <span className={`badge badge-${product.badge}`}>{product.badge}</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div style={{ display: "flex", gap: "8px" }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      position: "relative",
                      width: "72px",
                      height: "72px",
                      borderRadius: "var(--radius-sm)",
                      overflow: "hidden",
                      border: selectedImage === i ? "2px solid var(--clr-text)" : "1px solid var(--clr-border)",
                      cursor: "pointer",
                      padding: 0,
                      background: "none",
                      opacity: selectedImage === i ? 1 : 0.6,
                      transition: "all 200ms",
                    }}
                  >
                    <Image src={img} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div style={{ position: "sticky", top: "100px" }}>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--clr-accent)",
                  marginBottom: "8px",
                  fontWeight: 500,
                }}
              >
                {product.category.replace(/-/g, " ")}
              </p>

              <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: "16px" }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= Math.round(product.rating)} />
                  ))}
                </div>
                <span style={{ fontSize: "14px", color: "var(--clr-text-muted)" }}>
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
                <span style={{ fontSize: "28px", fontWeight: 500, letterSpacing: "-0.02em" }}>
                  {formatPrice(variant.price)}
                </span>
                {variant.comparePrice && (
                  <>
                    <span style={{ fontSize: "18px", color: "var(--clr-text-light)", textDecoration: "line-through" }}>
                      {formatPrice(variant.comparePrice)}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "white",
                        background: "var(--clr-sale)",
                        padding: "2px 8px",
                        borderRadius: "var(--radius-sm)",
                        fontWeight: 500,
                      }}
                    >
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              <p style={{ fontSize: "14px", color: "var(--clr-text-muted)", lineHeight: 1.7, marginBottom: "28px" }}>
                {product.shortDescription}
              </p>

              {/* Variant Selector */}
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--clr-text-light)",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Metal: {variant.name}
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.variants.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(i)}
                      style={{
                        padding: "10px 20px",
                        fontSize: "13px",
                        borderRadius: "var(--radius-sm)",
                        border: selectedVariant === i ? "2px solid var(--clr-text)" : "1px solid var(--clr-border)",
                        background: selectedVariant === i ? "var(--clr-bg-dark)" : "transparent",
                        color: selectedVariant === i ? "white" : "var(--clr-text)",
                        cursor: "pointer",
                        transition: "all 200ms",
                        fontFamily: "inherit",
                      }}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--clr-text-light)",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Quantity
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "0", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-sm)", width: "fit-content" }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: "40px", height: "40px", border: "none", background: "none", cursor: "pointer", fontSize: "18px", color: "var(--clr-text-muted)" }}
                  >
                    −
                  </button>
                  <span style={{ width: "40px", textAlign: "center", fontSize: "14px", fontWeight: 500 }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ width: "40px", height: "40px", border: "none", background: "none", cursor: "pointer", fontSize: "18px", color: "var(--clr-text-muted)" }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Stock & Shipping */}
              <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
                {product.inStock && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--clr-success)" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--clr-success)" }} />
                    In Stock — {product.shipsIn}
                  </div>
                )}
                <div style={{ fontSize: "13px", color: "var(--clr-text-muted)" }}>
                  SKU: {variant.sku}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: "14px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
                >
                  Add to Bag • {formatPrice(variant.price * quantity)}
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="btn btn-accent"
                  style={{ flex: 1, padding: "14px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  onClick={() => alert("Added to your atelier wishlist!")}
                  className="btn-icon"
                  style={{ width: "48px", height: "48px", cursor: "pointer" }}
                  aria-label="Add to wishlist"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Trust badges */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  padding: "20px",
                  background: "var(--clr-bg-alt)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                {[
                  { icon: "🛡️", text: "IGI Certified Diamond" },
                  { icon: "🚚", text: "Free Insured Shipping" },
                  { icon: "↩️", text: "15-Day Returns" },
                  { icon: "💎", text: "Lifetime Warranty" },
                ].map((trust) => (
                  <div key={trust.text} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--clr-text-muted)" }}>
                    <span>{trust.icon}</span>
                    {trust.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Description / Specs / Reviews */}
      <section style={{ background: "var(--clr-surface)" }}>
        <div className="container">
          {/* Tab Headers */}
          <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--clr-border)", marginBottom: "32px" }}>
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "14px 24px",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab ? "2px solid var(--clr-text)" : "2px solid transparent",
                  color: activeTab === tab ? "var(--clr-text)" : "var(--clr-text-light)",
                  cursor: "pointer",
                  transition: "all 200ms",
                  fontFamily: "inherit",
                }}
              >
                {tab === "reviews" ? `Reviews (${productReviews.length})` : tab === "specs" ? "Specifications" : "Description"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div style={{ maxWidth: "720px" }}>
              <p style={{ fontSize: "15px", lineHeight: 1.8 }}>{product.description}</p>
            </div>
          )}

          {activeTab === "specs" && (
            <div style={{ maxWidth: "560px" }}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: "1px solid var(--clr-border-light)",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "var(--clr-text-light)", fontWeight: 500 }}>{key}</span>
                  <span style={{ color: "var(--clr-text)" }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div style={{ maxWidth: "720px" }}>
              {productReviews.length > 0 ? (
                productReviews.map((review) => (
                  <div
                    key={review.id}
                    style={{
                      paddingBottom: "24px",
                      marginBottom: "24px",
                      borderBottom: "1px solid var(--clr-border-light)",
                    }}
                  >
                    <div className="stars" style={{ marginBottom: "8px" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={star <= review.rating} size={14} />
                      ))}
                    </div>
                    <h4 style={{ fontSize: "15px", fontWeight: 500, marginBottom: "8px" }}>{review.title}</h4>
                    <p style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "12px" }}>{review.comment}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
                      <span style={{ fontWeight: 500, color: "var(--clr-text)" }}>{review.author}</span>
                      <span style={{ color: "var(--clr-text-light)" }}>{review.date}</span>
                      {review.verified && <span style={{ color: "var(--clr-success)" }}>✓ Verified Purchase</span>}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--clr-text-muted)", fontSize: "14px" }}>
                  No reviews yet. Be the first to review this product.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="container">
            <div className="section-header">
              <div className="section-header__text">
                <h2>You May Also Love</h2>
              </div>
            </div>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Mobile Bottom Add to Bag Bar */}
      <div
        className="mobile-sticky-buy-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid var(--clr-border)",
          padding: "12px 16px",
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 800,
          boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ flex: 1, minWidth: 0, marginRight: "12px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {product.name}
          </div>
          <div style={{ fontSize: "12px", color: "var(--clr-accent)", fontWeight: 600 }}>
            {formatPrice(variant.price)}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="btn btn-primary"
          style={{ padding: "10px 18px", fontSize: "13px", fontWeight: 600, flexShrink: 0 }}
        >
          Add to Bag
        </button>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .mobile-sticky-buy-bar {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
