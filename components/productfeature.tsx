import styles from "@/styles/Productfeature.module.css";
import Image from "next/image";

import Link from "next/link";

type FeatureProps = {
    image: string;
    title: string;
    description: string;
  };
  
  const ProductFeature = ({ image, title, description }: any) => {
    return (
      <div className={styles.featureContainer}>
        <div className={styles.imageWrapper}>
          <Image src={image} alt={title} width={400} height={400} />
        </div>
        <div className={styles.textContent}>
          <h2>{title}</h2>
          <p>{description}</p>
          <button className={styles.shopBtn}><Link href='/productmain'> Shop Now </Link></button>
        </div>
      </div>
    );
  };
  
  export default ProductFeature;