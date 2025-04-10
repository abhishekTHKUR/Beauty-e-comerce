import { useEffect, useState } from "react";
import styles from '@/styles/Main.module.css';

// Define product type
type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
};

export default function BeautyProduct() {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setData(data.products));
  }, []);
  console.log(data);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Beauty Products</h1>

      {data ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
