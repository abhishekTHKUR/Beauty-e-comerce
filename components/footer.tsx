import styles from '@/styles/Footer.module.css'
import Link from 'next/link'

const Footer = () => {
    return (
      <footer className={styles.footer}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h2>GlowBeauty</h2>
            <p>Your daily dose of skincare and elegance.</p>
          </div>
          <div className={styles.links}>
            <div>
              <h4>Shop</h4>
              <Link href="/products">Products</Link>
              <Link href="/category/skincare">Skincare</Link>
              <Link href="/category/makeup">Makeup</Link>
            </div>
            <div>
              <h4>Company</h4>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/blog">Blog</Link>
            </div>
            <div>
              <h4>Support</h4>
              <Link href="/faq">FAQs</Link>
              <Link href="/shipping">Shipping Info</Link>
              <Link href="/returns">Returns</Link>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} GlowBeauty. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;