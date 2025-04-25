import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Header.module.css"; // Adjust the path as necessary

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching:", searchQuery);
      // Handle search logic or redirect
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        {/* Left: Logo + Hamburger */}
        <div className={styles.leftSection}>
          <Link href="/" className={`${styles.logoWrapper} ${isScrolled ? styles.logoScrolled : ""}`}>
            <div className={styles.logoCircle}>
              <Image
                src="/images/logo1.avif" // Adjust the path to your logo image
                alt="Logo"
                width={50}
                height={40}
                className={styles.logoImage}
                priority
              />
            </div>
          </Link>

          {/* Hamburger Menu */}
          <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </div>

        {/* Center: Links */}
        <div className={`${styles.centerSection} ${menuOpen ? styles.navOpen : ""}`}>
          <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/productmain">Product</Link>
            <Link href="/category" className={styles.categoryLink}>
              Category
            </Link>
          </div>
        </div>

        {/* Right: Search */}
        <div className={`${styles.rightSection} ${menuOpen ? styles.navOpen : ""}`}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
