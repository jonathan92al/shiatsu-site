import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <a href="https://www.instagram.com/gal_shiatsu/" target="_blank">
        <i className="fa-brands fa-instagram"></i>
      </a>
      <p>All rights reserved {year} &copy;</p>
    </div>
  );
}
