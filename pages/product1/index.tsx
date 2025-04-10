import { useEffect, useState } from "react";
import styles from "@/styles/product.module.css";

type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
};

export default function ProductList() {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const json = await res.json();
        setData(json.products); 
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      }
    };

    fetchData();
    
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Product List</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.grid}>
        {data.map((product) => (
          <div key={product.id} className={styles.card}>
            <h2>{product.title}</h2>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
