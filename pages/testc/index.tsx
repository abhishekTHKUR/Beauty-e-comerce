'use client';

import React, { useEffect, useState } from 'react';
import styles from "@/styles/Category.module.css";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
};

export default function CategoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://dummyjson.com/products');
      const data: { products: Product[] } = await res.json();
      setProducts(data.products);

      const uniqueCategories = Array.from(new Set(data.products.map((p: Product) => p.category)));
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

  return (
    <div className={styles.container}>
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

      {selectedCategory && (
        <>
          <h2 className={styles.productsTitle}>Products in "{selectedCategory}"</h2>
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
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
      )}
    </div>
  );
}
