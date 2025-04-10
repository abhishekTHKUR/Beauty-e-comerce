// components/header.tsx
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>



        <Link href='/'>Home</Link>
        <Link href='/productmain'>Product</Link>
        <Link href='/category' className={styles.categoryLink}>Category</Link>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
