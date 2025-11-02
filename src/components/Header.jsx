import classes from "./Header.module.css";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1 className={classes.logoText}>
          <span className={classes.logoMain}>Shiatsu</span>
          <span className={classes.logoBy}>by</span>
          <span className={classes.logoName}>Gal</span>
        </h1>
      </div>
      <Navbar />
    </header>
  );
}
