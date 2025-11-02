import classes from "./Content.module.css";

export default function Content() {
  return (
    <section id="about" className={classes.hero}>
      <div className={classes.heroContent}>
        <h1 className={classes.heroTitle}>Welcome to Tranquility</h1>
        <p className={classes.heroSubtitle}>
          Experience the healing art of Shiatsu massage
        </p>
        <p className={classes.heroDescription}>
          Discover balance and wellness through traditional Japanese bodywork techniques. 
          Let healing energy flow through mindful touch and pressure point therapy.
        </p>
        <button className={classes.ctaButton}>Book a Session</button>
      </div>
    </section>
  );
}
