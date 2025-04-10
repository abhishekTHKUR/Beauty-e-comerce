// pages/productid/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/Productdetail.module.css";

interface ReviewType {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  images: string[];
  thumbnail: string;
  returnPolicy: string;
  reviews: ReviewType[];
};

export default function ProductDetail({ product }: { product: ProductType }) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  
  const imageGallery = [
    ...new Set([
      ...product.images.slice(0, 4),
      "/images/static1.avif",
      "/images/static2.avif",
      "/images/static3.avif",
      "/images/static4.avif",
    ])
  ];
  

  return (
    <div className={styles.container}>
    {/* Left - Image gallery */}
    <div className={styles.left}>
      <div className={styles.mainImage}>
        <Image src={selectedImage} alt={product.title} width={400} height={500} />
      </div>

      <div className={styles.imageGrid}>
        {imageGallery.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`product-${i}`}
            width={80}
            height={80}
            className={styles.thumb}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>

      {/* Right - Product details */}
      <div className={styles.right}>
        <h2 className={styles.brand}>{product.brand}</h2>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.rating}>★ {product.rating} | {product.stock} in stock</p>

        <div className={styles.priceSection}>
          <span className={styles.price}>₹{product.price}</span>
          <span className={styles.originalPrice}>₹{Math.round(product.price * (1 + product.discountPercentage / 100))}</span>
          <span className={styles.discount}>{product.discountPercentage}% OFF</span>
        </div>

        <div className={styles.sizeSection}>
          <h4>Select Size</h4>
          <div className={styles.sizes}>
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <button key={size} className={styles.sizeBtn}>{size}</button>
            ))}
          </div>
        </div>

        <div className={styles.returnPolicy}>
          <h4>Return Policy</h4>
          <p>{product.returnPolicy}</p>
        </div>

        <div className={styles.reviewSection}>
          <h3>Customer Reviews</h3>
          {product.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            product.reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <p><strong>{review.reviewerName}</strong> ({review.rating}/5)</p>
                <p>{review.comment}</p>
                <small>
  {new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(review.date))}
</small>

              </div>
            ))
          )}
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.addToBag}>Add to Bag</button>
          <button className={styles.wishlist}>Wishlist</button>
        </div>

        <div className={styles.offers}>
          <h4>Available Offers</h4>
          <ul>
            <li>10% Instant Discount on XYZ Bank Cards</li>
            <li>Extra ₹100 OFF on orders above ₹999</li>
            <li>Free Delivery on your first order</li>
          </ul>
        </div>

        <div className={styles.delivery}>
          <h4>Delivery Options</h4>
          <input type="text" placeholder="Enter Pincode" className={styles.pincode} />
          <p>Get it by <strong>Tue, 16 Apr</strong> | Free Delivery</p>
        </div>

        <div className={styles.details}>
          <h4>Product Details</h4>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=30");
  const data = await res.json();
  const paths = data.products.map((product: { id: number }) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) return { notFound: true };

  const product = await res.json();

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
};
