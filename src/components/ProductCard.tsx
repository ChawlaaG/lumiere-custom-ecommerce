import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/data/products";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#d4a847" : "none"} stroke="#d4a847" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const discountPercent = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`} className="product-card">
      {/* Image */}
      <div className="product-card__image-wrap">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="product-card__badge">
            <span className={`badge badge-${product.badge}`}>{product.badge}</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="product-card__actions">
          <button
            className="product-card__quick-action"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
          <button
            className="product-card__quick-action"
            aria-label="Quick view"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <span className="product-card__category">
          {product.category.replace(/-/g, " ")}
        </span>
        <h3 className="product-card__name">{product.name}</h3>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} filled={star <= Math.round(product.rating)} />
            ))}
          </div>
          <span>({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="product-card__price">
          <span className="product-card__price-current">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <>
              <span className="product-card__price-compare">{formatPrice(product.comparePrice)}</span>
              <span className="product-card__price-discount">-{discountPercent}%</span>
            </>
          )}
        </div>

        {/* Stock */}
        {product.inStock && (
          <div className="product-card__stock">{product.shipsIn}</div>
        )}
      </div>
    </Link>
  );
}
