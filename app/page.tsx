"use client";

import React from "react";

export default function Home() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Quiz Game
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "400px", marginBottom: "2rem" }}>
        Bem-vindo ao jogo de quiz sobre programação! Clique no botão abaixo para começar.
      </p>
      <button
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#00d2ff",
          color: "#000",
          fontWeight: "bold",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#00bcd4")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#00d2ff")
        }
      >
        Jogar Agora
      </button>
    </main>
  );
}
