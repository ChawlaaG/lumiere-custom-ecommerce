"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, categories, reviews } from "@/data/products";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#d4a847" : "none"} stroke="#d4a847" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "min(85dvh, 720px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: 0,
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="/images/hero-ring.jpg"
            alt="Aurora Solitaire Diamond Engagement Ring in 18k Yellow Gold"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, rgba(250,249,247,0.95) 0%, rgba(250,249,247,0.85) 40%, rgba(250,249,247,0.2) 70%, transparent 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, paddingTop: "80px", paddingBottom: "80px" }}
        >
          <div style={{ maxWidth: "520px" }}>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--clr-accent)",
                marginBottom: "16px",
                fontWeight: 500,
              }}
            >
              New Collection 2024
            </p>
            <h1
              style={{
                marginBottom: "20px",
                color: "var(--clr-text)",
                lineHeight: 1.1,
              }}
            >
              Crafted for the
              <br />
              moments that
              <br />
              matter most
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "var(--clr-text-muted)",
                lineHeight: 1.7,
                marginBottom: "36px",
                maxWidth: "400px",
              }}
            >
              Ethically sourced lab-grown diamonds, handcrafted in 18K gold and platinum.
              Every piece designed to be cherished for a lifetime.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/collections/engagement-rings" className="btn btn-primary">
                Shop Engagement Rings
              </Link>
              <Link href="/collections" className="btn btn-secondary">
                Explore Collections
              </Link>
            </div>

            {/* Trust signals */}
            <div
              style={{
                display: "flex",
                gap: "32px",
                marginTop: "48px",
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "IGI", label: "Certified Diamonds" },
                { value: "Free", label: "Shipping & Returns" },
                { value: "18K", label: "Gold & Platinum" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--clr-text)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--clr-text-light)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      marginTop: "2px",
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ background: "var(--clr-bg)" }} ref={addRevealRef} className="reveal">
        <div className="container">
          <div className="section-header">
            <div className="section-header__text">
              <h2>Shop by Category</h2>
              <p>Find the perfect piece for every moment and every style</p>
            </div>
            <Link href="/collections" className="btn btn-secondary btn-sm">
              View All
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
            }}
            className="categories-grid"
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/collections/${cat.slug}`}
                className="category-card"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <div className="category-card__overlay">
                  <h3 className="category-card__name">{cat.name}</h3>
                  <p className="category-card__count">{cat.productCount} pieces</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ background: "var(--clr-surface)" }} ref={addRevealRef} className="reveal">
        <div className="container">
          <div className="section-header">
            <div className="section-header__text">
              <h2>Curated for You</h2>
              <p>Our most-loved pieces, handpicked by our design team</p>
            </div>
            <Link href="/collections" className="btn btn-secondary btn-sm">
              Shop All
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTION HERO SPLIT ── */}
      <section style={{ padding: 0 }} ref={addRevealRef} className="reveal">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "500px",
          }}
          className="split-hero"
        >
          {/* Image */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src="/images/collection-hero.jpg"
              alt="Fine jewelry collection flat lay"
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "64px",
              background: "var(--clr-bg-alt)",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--clr-accent)",
                marginBottom: "16px",
                fontWeight: 500,
              }}
            >
              The Everyday Collection
            </p>
            <h2 style={{ marginBottom: "16px", maxWidth: "400px" }}>
              Pieces that move with you
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "var(--clr-text-muted)",
                lineHeight: 1.7,
                maxWidth: "400px",
                marginBottom: "32px",
              }}
            >
              From morning meetings to evening celebrations — delicate gold pieces designed
              to layer, stack, and style your way. No-fuss luxury that feels effortless.
            </p>
            <div>
              <Link href="/collections/necklaces" className="btn btn-primary">
                Discover the Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY LUMIÈRE ── */}
      <section style={{ background: "var(--clr-surface)" }} ref={addRevealRef} className="reveal">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2>Why Lumière</h2>
            <p style={{ maxWidth: "480px", margin: "12px auto 0", fontSize: "15px" }}>
              Every detail is intentional — from sourcing to setting
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px",
            }}
            className="features-grid"
          >
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent)" strokeWidth="1.2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
                title: "Lab-Grown Diamonds",
                description: "Identical to mined diamonds in every way — the same brilliance, hardness, and fire — without the ethical or environmental cost.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent)" strokeWidth="1.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: "IGI Certified",
                description: "Every center stone comes with an independent certification from the International Gemological Institute for complete peace of mind.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent)" strokeWidth="1.2">
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <path d="M16 8h4l3 3v5a2 2 0 01-2 2h-1M6 19h12" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
                title: "Free Shipping & Returns",
                description: "Complimentary insured delivery across India. Not what you expected? Return within 15 days for a full refund — no questions.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent)" strokeWidth="1.2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: "Lifetime Warranty",
                description: "Free resizing, cleaning, and inspection for life. We stand behind every piece because we craft each one to be a forever companion.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                style={{
                  textAlign: "center",
                  padding: "24px 16px",
                }}
              >
                <div style={{ marginBottom: "16px" }}>{feature.icon}</div>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    marginBottom: "10px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: "13px", lineHeight: 1.7 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "var(--clr-bg)" }} ref={addRevealRef} className="reveal">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2>What Our Customers Say</h2>
            <p style={{ maxWidth: "400px", margin: "12px auto 0", fontSize: "15px" }}>
              Real stories from real moments
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
            className="testimonials-grid"
          >
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                style={{
                  background: "var(--clr-surface)",
                  borderRadius: "var(--radius-md)",
                  padding: "32px",
                  border: "1px solid var(--clr-border-light)",
                }}
              >
                <div className="stars" style={{ marginBottom: "16px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= review.rating} />
                  ))}
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 500, marginBottom: "8px" }}>
                  {review.title}
                </h4>
                <p style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" }}>
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--clr-text)" }}>
                    {review.author}
                  </span>
                  {review.verified && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "var(--clr-success)",
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section
        style={{
          background: "var(--clr-bg-dark)",
          color: "var(--clr-text-inverse)",
          textAlign: "center",
        }}
        ref={addRevealRef}
        className="reveal"
      >
        <div className="container" style={{ maxWidth: "560px" }}>
          <h2 style={{ color: "white", marginBottom: "12px" }}>
            Join the Lumière family
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "32px",
              lineHeight: 1.7,
            }}
          >
            Be the first to know about new arrivals, exclusive offers, and behind-the-scenes
            stories from our atelier. Plus, get 10% off your first order.
          </p>
          <form
            style={{
              display: "flex",
              gap: "12px",
              maxWidth: "440px",
              margin: "0 auto",
            }}
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              className="input"
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
              }}
            />
            <button type="submit" className="btn btn-accent">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .categories-grid > :last-child {
            grid-column: 1 / -1;
          }
          .split-hero {
            grid-template-columns: 1fr !important;
          }
          .split-hero > div:first-child {
            aspect-ratio: 4 / 3;
          }
          .split-hero > div:last-child {
            padding: 40px 24px !important;
          }
          .features-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
          .newsletter-form {
            flex-direction: column !important;
          }
        }
      `}</style>
    </>
  );
}
