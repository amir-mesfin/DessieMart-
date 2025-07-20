import React, { useState } from 'react';
import { FiSearch, FiBell, FiSun, FiMoon, FiChevronDown } from 'react-icons/fi';
import styles from './header.module.css';

const Header = ({ pageTitle }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // Add your theme switching logic here
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Company Logo" className={styles.logo} />
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
      </div>
      
      <div className={styles.controls}>
        <div className={styles.search}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search..." 
            className={styles.searchInput}
          />
        </div>
        
        <button className={styles.notificationBtn}>
          <FiBell className={styles.icon} />
          <span className={styles.notificationBadge}>3</span>
        </button>
        
        <button 
          className={styles.themeToggle} 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {darkMode ? <FiSun className={styles.icon} /> : <FiMoon className={styles.icon} />}
        </button>
        
        <div className={styles.userDropdown}>
          <div className={styles.userInfo} onClick={toggleDropdown}>
            <img 
              src="/avatar.jpg" 
              alt="User Avatar" 
              className={styles.avatar}
            />
            <span className={styles.userName}>John Doe</span>
            <FiChevronDown className={`${styles.dropdownIcon} ${showDropdown ? styles.rotate : ''}`} />
          </div>
          
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <a href="/profile" className={styles.dropdownItem}>Profile</a>
              <a href="/settings" className={styles.dropdownItem}>Settings</a>
              <a href="/logout" className={styles.dropdownItem}>Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;