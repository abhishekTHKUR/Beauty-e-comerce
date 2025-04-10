// components/staticproductcard.tsx
import styles from "@/styles/productcard.module.css";
import Image from "next/image";
import Link from "next/link";

type ProductType = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type ProductProps = {
  products: ProductType[];
};

const ProductCard = ({ products }: ProductProps) => {
  return (
    <div className={styles.productsSection}>
      <h2>Featured Products</h2>
      <div className={styles.productGrid}>
      {products.map((product) => (
  <Link href={`/product/${product.id}`} key={product.id}>
    <div className={styles.card}>
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={200}
        height={200}
      />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
    </div>
  </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;



