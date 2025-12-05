const { Server } = require("socket.io");

const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001; // se houver PORT no ambiente, usa; senão 3001

const io = new Server(PORT, {
  cors: {
    origin: "*", // permite conexões de qualquer lugar
  },
});

let usuariosOnline = {};

io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  socket.on("user_join", (nome) => {
    usuariosOnline[socket.id] = nome;
    io.emit("online_users", usuariosOnline);
  });

  socket.on("mensagem", (msg) => {
    console.log("Mensagem recebida:", msg);
    io.emit("mensagem", msg);
  });

  socket.on("digitando", (nome) => {
    socket.broadcast.emit("digitando", { id: socket.id, nome });
  });

  // 🔵 NOVO: atualizar nome do usuário
  socket.on("update_name", (novoNome) => {
    if (usuariosOnline[socket.id]) {
      usuariosOnline[socket.id] = novoNome;
      io.emit("online_users", usuariosOnline);
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
    delete usuariosOnline[socket.id];
    io.emit("online_users", usuariosOnline);
  });
});

console.log("Servidor Socket.IO rodando na porta 3001");
