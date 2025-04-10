// pages/index.tsx
import styles from "@/styles/Main.module.css";
import ImageCarousel from "@/components/imagecarousel";
import ProductFeature from "@/components/productfeature";
import ProductCard from "@/components/staticproductcard";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ProductType = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type HomeProps = {
  products: ProductType[];
};

export default function Home({ products }: HomeProps) {
  const router = useRouter();
  const searchQuery = (router.query.q as string)?.toLowerCase() || "";
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  return (
    <>
      <ImageCarousel />

      {searchQuery && (
        <p style={{ marginLeft: "1rem" }}>
          Showing results for: <strong>{searchQuery}</strong>
        </p>
      )}

      <ProductCard products={filteredProducts} />

      {!searchQuery && (
        <ProductFeature
          image="/images/beautyfeature.jpg"
          title="Rose Glow Face Serum"
          description="Our Rose Glow Face Serum is a luxurious blend of rosehip oil, vitamin E, and hyaluronic acid – designed to hydrate, nourish, and give your skin that natural glow. Perfect for daily skincare routines."
        />
      )}
    </>
  );
}

// ✅ SSG Logic
export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=18");
    const data = await res.json();

    return {
      props: {
        products: data.products || [],
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};
