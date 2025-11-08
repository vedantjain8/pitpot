import { Link } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  return (
    <main className="landing">
      <div className="overlay">
        <h1 className="company">pitpot</h1>
        <p className="desc">
          We are a small student-run plant shop bringing happy green plants to
          your home. Affordable, friendly, and easy to care for.
        </p>
        <Link to="/products" className="cta">
          Get Started
        </Link>
      </div>
    </main>
  );
}
