"use client";

import React from "react";

import Timer from './componets/timer';

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
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem",fontFamily:"system-ui" }}>
        Quiz Game
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "400px", marginBottom: "2rem",  }}>
        Olá seja bem-vindo.
        <span>Se voce está vendo está Página significa que o jogo ainda está no forno</span>
      </p>
      <h2>Até o Lançamento</h2>
      <div><Timer/></div>
      <br />
      <button
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#638591ff",
          pointerEvents:"none",
          color:"#eee",
          fontWeight: "bold",
          cursor:"pointer",
          transition: "all 0.2s ease-in-out",
        }}
        onClick={()=>{
          alert("O jogo ainda está em desenvolvimento")
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
