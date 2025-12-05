"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [meuNome, setMeuNome] = useState<string>(() => "user_" + Math.floor(Math.random() * 9999));
  const [mensagem, setMensagem] = useState<string>("");
  const [chat, setChat] = useState<Array<{texto: string; autor: string}>>([]);
  const socketRef = useRef<Socket | null>(null);

  const [usuariosOnline, setUsuariosOnline] = useState<Record<string, string>>({});
  const [digitandoUser, setDigitandoUser] = useState<string | null>(null);

  const [alerta, setAlerta] = useState<string | null>(null);
  const [barraProgresso, setBarraProgresso] = useState<number>(100);

  useEffect(() => {
const SOCKET_URL =
    process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://infratech-quiz-game.vercel.app";

socketRef.current = io(SOCKET_URL);

    // envia nome do usuário ao conectar
    socketRef.current.emit("user_join", meuNome);

    // mensagens
    socketRef.current.on("mensagem", (msgObj: {texto: string; autor: string}) => {
      setChat((prev) => [...prev, msgObj]);
    });

    // lista de usuários online
    socketRef.current.on("online_users", (lista: Record<string,string>) => {
      setUsuariosOnline(lista);
    });

    // digitando
    socketRef.current.on("digitando", (data: { nome: string }) => {
      setDigitandoUser(data.nome);
      setTimeout(() => setDigitandoUser(null), 2000);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [meuNome]);

  const enviarMensagem = () => {
    if (mensagem.trim() !== "") {
      socketRef.current?.emit("mensagem", { texto: mensagem, autor: meuNome });
      setMensagem("");
    }
  };

  const alterarNome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector("input") as HTMLInputElement;
    const novoNome = input.value.trim();
    if (!novoNome) return;

    setMeuNome(novoNome);
    socketRef.current?.emit("update_name", novoNome);

    // alerta
    setAlerta(`Nome alterado para ${novoNome}`);
    setBarraProgresso(100);
    input.value = "";

    const duracao = 5000; // 5s
    const decrement = 100 / (duracao / 50);
    const interval = setInterval(() => {
      setBarraProgresso((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setAlerta(null);
          return 0;
        }
        return prev - decrement;
      });
    }, 50);
  };

  return (
    <main>
      <div className="usersContainer">
        <header>
          <h1>InfraTech <span>Chat</span></h1>
        </header>

        <div className="usersContent">
          <h2>Todos usuários</h2>
          <div className="list-users">
            {Object.entries(usuariosOnline).map(([id, nome]) => (
              <p className="user" key={id}>
                <span className="username">{nome}</span>
                <span className={`state on`}>online</span>
                <span className="status">{digitandoUser === nome ? "está digitando..." : ""}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="profileContent">
          <h2>Perfil</h2>
          <div aria-label="Perfil do usuario">
            <p>nome: <span>{meuNome}</span></p>
          </div>
        </div>

        <div className="Content ContentSet">
          <h2>Configurações</h2>
          <form aria-label="Alterar nome do usuario" onSubmit={alterarNome}>
            <input type="text" placeholder="Alterar nome" />
            <button type="submit">Confirmar</button>
          </form>
        </div>
      </div>

      <div className="chatContainer">
        <h1>Chat em tempo real</h1>
        <div className="contentChats">
          {chat.map((m, i) => (
            <div key={i} className={m.autor === meuNome ? "chat sent" : "chat received"}>
              <small className="autorName">{m.autor}</small>
              <span>{m.texto}</span>
            </div>
          ))}
        </div>

        <div className="contentSettings">
          <input
            type="text"
            value={mensagem}
            onChange={(e) => {
              setMensagem(e.target.value);
              socketRef.current?.emit("digitando", meuNome);
            }}
            placeholder="Digite algo..."
            style={{ marginRight: "0.5rem" }}
          />
          <button onClick={enviarMensagem}>Enviar</button>
        </div>
      </div>

      {alerta && (
        <div className="alerta">
          <span>{alerta}</span>
          <div className="barra" style={{ width: `${barraProgresso}%` }}></div>
        </div>
      )}
    </main>
  );
}
