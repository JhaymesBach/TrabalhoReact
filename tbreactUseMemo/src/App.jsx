import React, { useState, useMemo } from "react";

// Componente principal da aplicação
export default function App() {
  // `number` guarda o valor digitado no input, começando em 5
  const [number, setNumber] = useState(5);
  // `clicks` conta quantas vezes o botão foi clicado
  const [clicks, setClicks] = useState(0);

  // useMemo memoriza o cálculo do fatorial para não recalcular toda hora
  const factorial = useMemo(() => {
    // função recursiva que calcula o fatorial
    const calc = (n) => (n <= 1 ? 1 : n * calc(n - 1));
    return calc(number);
  }, [number]); // só recalcula quando `number` muda

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔢 Fatorial Fácil</h1>
        <p style={styles.subtitle}>
          Digite um número e veja o resultado instantaneamente
        </p>

        {/* Campo de input para digitar o número */}
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          style={styles.input}
          min={0}
        />

        {/* Exibe o resultado do fatorial */}
        <p style={styles.result}>
          Fatorial de <b>{number}</b> é <b>{factorial}</b>
        </p>

        {/* Botão que conta quantas vezes foi clicado */}
        <button style={styles.button} onClick={() => setClicks((c) => c + 1)}>
          Cliquei {clicks} vezes
        </button>
      </div>
    </div>
  );
}

// Estilos aplicados direto nos elementos
const styles = {
  page: {
    height: "100vh", 
    width: "100vw",
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e0f7fa, #80deea)", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
    boxSizing: "border-box",
  },
  card: {
    background: "white",
    padding: "50px 40px",
    borderRadius: 25,
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)", 
    textAlign: "center",
    width: "100%",
    maxWidth: 400, 
  },
  title: {
    fontSize: 26,
    marginBottom: 10,
    color: "#00796b", 
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 25,
    color: "#555", 
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 15,
    border: "1px solid #ccc",
    marginBottom: 20,
    fontSize: 16,
    outline: "none",
    boxSizing: "border-box",
  },
  result: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  button: {
    padding: "12px 24px",
    borderRadius: 15,
    border: "none",
    background: "#00796b",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease", 
  },
};
