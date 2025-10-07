import React from "react";

interface LoadingProps {
  color?: string;
  size?: "small" | "medium" | "large";
  text?: string;
  textColor?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  color = "#32cd32",
  size = "medium",
  text = "Carregando...",
  textColor = "#000",
}) => {
  const sizePx = size === "small" ? 20 : size === "medium" ? 40 : 60;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "20px 0" }}>
      <div
        style={{
          width: sizePx,
          height: sizePx,
          border: `4px solid ${color}`,
          borderTop: `4px solid transparent`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      {text && <p style={{ color: textColor, marginTop: 8 }}>{text}</p>}

      {/* Adicione essa animação global */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
};
/* Cria um círculo giratório (spinner) usando CSS.

Mostra texto opcional abaixo do spinner.

Pode ser configurado via props (color, size, text, textColor). */