import { Menu, X } from "lucide-react";
import classes from "./Navbar.module.css";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenMenu() {
    setIsOpen(true);
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  function handleNavClick(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  }

  return (
    <nav className={classes.navbar}>
      {/* Mobile menu icon */}
      <div className={classes.mobileIcon}>
        {isOpen ? (
          <X onClick={handleCloseMenu} />
        ) : (
          <Menu onClick={handleOpenMenu} />
        )}
      </div>

      {/* Desktop navigation - always visible on large screens */}
      <ul className={classes.desktopNav}>
        <li onClick={() => handleNavClick('about')}>About</li>
        <li onClick={() => handleNavClick('gallery')}>Gallery</li>
        <li onClick={() => handleNavClick('contact')}>Contact</li>
      </ul>

      {/* Mobile navigation - toggle on mobile */}
      {isOpen && (
        <ul className={classes.mobileNav}>
          <li onClick={() => handleNavClick('about')}>About</li>
          <li onClick={() => handleNavClick('gallery')}>Gallery</li>
          <li onClick={() => handleNavClick('contact')}>Contact</li>
        </ul>
      )}
    </nav>
  );
}
