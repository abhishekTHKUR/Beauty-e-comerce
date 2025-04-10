// pages/productmain.tsx
import { useState } from "react";
import ProductCard from "@/components/staticproductcard";
import Image from "next/image";
import styles from "@/styles/Productdata.module.css";
import { GetStaticProps } from "next";

type ProductType = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type ProductMainProps = {
  products: ProductType[];
};

const ProductDetail = ({ products }: ProductMainProps) => {
  const productsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Silk & Shine Moisturizing Cream</h1>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/beautyfeature1.jpg"
          alt="Silk & Shine Cream"
          width={1800}
          height={400}
        />
      </div>
      <p className={styles.description}>
        Indulge your skin with our luxurious moisturizing cream infused with natural silk proteins and vitamin E. Leaves your skin feeling soft, radiant, and deeply hydrated all day long.
      </p>

      <ProductCard products={visibleProducts} />

      <div className={styles.paginationControls}>
        <button onClick={handleBack} disabled={currentPage === 1} className={styles.navBtn}>
          ⬅ Back
        </button>
        <span className={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages} className={styles.navBtn}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=200");
  const data = await res.json();

  return {
    props: {
      products: data.products || [],
    },
   
  };
};
