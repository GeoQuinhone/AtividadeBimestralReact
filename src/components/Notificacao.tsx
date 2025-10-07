import React, { useEffect, useState } from "react";

interface NotificacaoProps {
  mensagem: string;                       
  tipo?: "sucesso" | "erro" | "aviso" | "info"; // tipo de notificação
  duracao?: number;                        
  onClose?: () => void; // função opcional ao fechar manualmente
}

export const Notificacao: React.FC<NotificacaoProps> = ({
  mensagem,
  tipo = "info",
  duracao = 4000,
  onClose,
}) => {
  const [visivel, setVisivel] = useState(true);

  // Fecha automaticamente após o tempo definido
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisivel(false);
      if (onClose) onClose();
    }, duracao);

    return () => clearTimeout(timer);
  }, [duracao, onClose]);

  if (!visivel) return null;

  const cores: Record<string, string> = {
    sucesso: "#4caf50",
    erro: "#f44336",
    aviso: "#ff9800",
    info: "#2196f3",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        padding: "12px 20px",
        backgroundColor: cores[tipo],
        color: "#fff",
        borderRadius: 5,
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        zIndex: 9999,
        minWidth: 250,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{mensagem}</span>
      <button
        onClick={() => {
          setVisivel(false);
          if (onClose) onClose();
        }}
        style={{
          marginLeft: 15,
          background: "transparent",
          border: "none",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
};
