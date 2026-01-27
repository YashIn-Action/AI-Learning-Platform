import React from "react";

function Login() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />

        <button style={styles.button}>Login</button>

        <p style={styles.text}>
          Don’t have an account? <span style={styles.link}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #5B5FEF, #8B5CF6)",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "16px",
    width: "320px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #5B5FEF, #8B5CF6)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  text: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#5B5FEF",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;
