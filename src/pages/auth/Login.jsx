import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import styles from "./Login.module.css";

const roles = ["Student", "Faculty", "Placement Officer", "Admin"];
const metrics = [
  ["10,000+", "Student Profiles"],
  ["92%", "Prediction Accuracy"],
  ["150+", "Recruiter Signals"],
];

export function Login() {
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);
  const login = useAuthStore((state) => state.login);
  const setRole = useAuthStore((state) => state.setRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    login({ email, role });
    if (role === "Student") {
      navigate("/student/dashboard");
      return;
    }
    navigate("/admin/dashboard");
  }

  return (
    <main className={styles.page}>
      <section className={styles.brandPanel} aria-label="GLATalentForecast.AI platform overview">
        <img src="/gla-logo.png" alt="GLA University" className={styles.logo} />
        <div>
          <div className={styles.wordmark}>
            <span className={styles.green}>GLA</span>
            <span className={styles.blue}>Talent</span>
            <span className={styles.orange}>Forecast</span>
            <span className={styles.ai}>.AI</span>
          </div>
          <p className={styles.platformLabel}>Placement Intelligence Platform</p>
        </div>

        <div className={styles.message}>
          <h1>Predict. Prepare. Place.<span>Built for Every Student.</span></h1>
          <p>AI-powered employability forecasting, placement prediction, recruiter demand insights, and skill-gap analysis designed for GLA University students and placement teams.</p>
        </div>

        <div className={styles.metrics}>
          {metrics.map(([value, label]) => (
            <div className={styles.metric} key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.authPanel} aria-label="Sign in">
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h2>Welcome Back</h2>
            <p>Sign in to access your placement intelligence dashboard</p>
          </div>

          <div className={styles.roleTabs} role="tablist" aria-label="Choose account role">
            {roles.map((item) => (
              <button
                className={role === item ? styles.activeRole : undefined}
                key={item}
                onClick={() => setRole(item)}
                role="tab"
                type="button"
                aria-selected={role === item}
              >
                {item}
              </button>
            ))}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              GLA Email Address
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="student@gla.ac.in" required />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />
            </label>
            <button className={styles.signInButton} type="submit">Sign In<ArrowRight size={16} /></button>
            <button className={styles.forgotButton} type="button">Forgot password?</button>
          </form>

          <div className={styles.footerText}>
            <span>Trusted by GLA University</span>
            <span>Built for Students, Faculty &amp; Placement Teams</span>
          </div>
        </div>
      </section>
    </main>
  );
}
