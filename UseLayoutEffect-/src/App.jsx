import React, { useState, useRef, useLayoutEffect } from "react";

// Componente principal da aplicação
export default function App() {
  // Criamos uma referência para acessar diretamente a div no DOM
  const boxRef = useRef();

  // Estado para armazenar a largura da caixa
  const [width, setWidth] = useState(0);

  // useLayoutEffect roda **depois que o DOM é atualizado**, mas antes da pintura
  // Isso garante que pegamos as medidas corretas sem causar piscadas na tela
  useLayoutEffect(() => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect(); // pega as dimensões reais da caixa
      setWidth(Math.round(rect.width)); // atualiza o estado com a largura arredondada
    }
  }, []); // só roda uma vez, quando o componente é montado

  return (
    <div style={styles.page}>
      {/* Título centralizado */}
      <h1 style={styles.title}>📏 Medidor de Largura</h1>

      {/* Caixa colorida, usamos a ref para medir sua largura */}
      <div ref={boxRef} style={styles.box} />

      {/* Mostra a largura medida da caixa */}
      <p style={styles.text}>
        Largura da caixa: <b>{width}px</b>
      </p>
    </div>
  );
}


const styles = {
  page: {
    height: "100vh", 
    width: "100vw", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #e0f7fa, #80deea)", 
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 32, 
    color: "#00796b", 
    marginBottom: 20, 
    textAlign: "center",
  },
  box: {
    width: "90%", 
    maxWidth: 1200, 
    height: 200, 
    background: "linear-gradient(135deg, #ff8a65, #d84315)", 
    borderRadius: 20, 
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)", 
    marginBottom: 20, 
    transition: "all 0.3s ease", 
  },
  text: {
    fontSize: 20, 
    color: "#333", 
  },
};

