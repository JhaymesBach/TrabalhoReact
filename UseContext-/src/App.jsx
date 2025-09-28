import React, { createContext, useContext, useState } from "react";

// 1️⃣ Criamos um contexto para notificações
const NotificationContext = createContext();

// 2️⃣ Provider que vai envolver toda a aplicação
function NotificationProvider({ children }) {
  // Aqui armazenamos todas as mensagens ativas
  const [messages, setMessages] = useState([]);

  // Função para adicionar uma nova mensagem
  const addMessage = (text, type = "info") => {
    const id = Date.now(); // cada mensagem tem um id único
    setMessages((prev) => [...prev, { id, text, type }]);

    // Remove a mensagem automaticamente depois de 3 segundos
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ addMessage }}>
      {children} {/* Renderiza os componentes filhos */}
      
      {/* Container que exibe as notificações */}
      <div style={styles.container}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{ ...styles.notification, ...styles[msg.type] }}
          >
            <span style={styles.icon}>{icons[msg.type]}</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

// Hook personalizado para usar o contexto de notificações
const useNotification = () => useContext(NotificationContext);

// Componente com os botões que disparam notificações
function Actions() {
  const { addMessage } = useNotification();

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button
        style={{ ...styles.btn, background: "#43a047" }}
        onClick={() => addMessage("Salvo com sucesso!", "success")}
      >
        Salvar
      </button>
      <button
        style={{ ...styles.btn, background: "#e53935" }}
        onClick={() => addMessage("Erro ao enviar!", "error")}
      >
        Enviar
      </button>
      <button
        style={{ ...styles.btn, background: "#fb8c00" }}
        onClick={() => addMessage("Atenção necessária!", "warning")}
      >
        Aviso
      </button>
      <button
        style={{ ...styles.btn, background: "#1e88e5" }}
        onClick={() => addMessage("Nova atualização disponível", "info")}
      >
        Info
      </button>
    </div>
  );
}

// Ícones usados nas notificações (poderia ser imagens ou SVG)
const icons = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

const styles = {
  container: {
    position: "fixed", 
    bottom: 20,
    right: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    zIndex: 1000,
  },
  notification: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    borderRadius: 10,
    color: "white",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    animation: "fadeIn 0.3s ease", 
  },
  success: { background: "linear-gradient(135deg, #66bb6a, #2e7d32)" },
  error: { background: "linear-gradient(135deg, #ef5350, #b71c1c)" },
  warning: { background: "linear-gradient(135deg, #ffa726, #ef6c00)" },
  info: { background: "linear-gradient(135deg, #42a5f5, #1565c0)" },
  btn: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
    transition: "transform 0.1s ease", 
  },
  icon: {
    fontSize: "20px",
  },
};

// Componente principal da aplicação
export default function App() {
  return (
    <NotificationProvider>
      <div style={{ padding: 20 }}>
        <h1>Notificações com useContext</h1>
        <p>Clique nos botões abaixo para disparar notificações 👇</p>
        <Actions />
      </div>
    </NotificationProvider>
  );
}
