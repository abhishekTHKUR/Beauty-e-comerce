// pages/product/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

export default function ProductPage({ product }: { product: ProductType }) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.title}</h1>
      <Image src={product.thumbnail} alt={product.title} width={400} height={400} />
      <p>{product.description}</p>
      <h3>${product.price}</h3>
    </div>
  );
}

// Build paths for all 60 products (can change limit)
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=60");
  const data = await res.json();

  const paths = data.products.map((product: { id: number }) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};
