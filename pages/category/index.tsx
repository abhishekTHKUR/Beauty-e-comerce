'use client';

import React, { useEffect, useState } from 'react';
import styles from "@/styles/Category.module.css";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  description: string;
  rating: number;
};

export default function CategoryPage({ products }: { products: Product[] }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('beauty');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    ) as string[];
    setCategories(uniqueCategories);
  }, [products]);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

  return (
    <div className={styles.container}>
      {!selectedProduct ? (
        <>
          <h1 className={styles.heading}>Product Categories</h1>

          <div className={styles.categories}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.categoryButton} ${
                  selectedCategory === cat ? styles.activeCategory : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <h2 className={styles.productsTitle}>
            Products in "{selectedCategory}"
          </h2>

          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => setSelectedProduct(product)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.productImage}
                />
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedProduct(null)}
            className={styles.backButton}
          >
            ← Back to Products
          </button>
          <div className={styles.productDetail}>
            <h2>{selectedProduct.title}</h2>
            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
              className={styles.detailImage}
            />
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Rating:</strong> ★ {selectedProduct.rating}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const resp = await fetch("https://dummyjson.com/products");
    const data = await resp.json();

    return {
      props: {
        products: data.products,
      },
    };
  } catch (error) {
    console.error("Something went wrong:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}
