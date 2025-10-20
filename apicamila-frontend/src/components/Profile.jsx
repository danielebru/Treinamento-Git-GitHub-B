import { useEffect, useState } from "react";

export default function Profile({ token }) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.error || "Erro ao buscar perfil");
        } else {
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
        setMessage("Erro na conexão com o servidor");
      }
    };

    fetchProfile();
  }, [token]);

  if (!token) return <p>Faça login para ver o perfil</p>;
  if (message) return <p>{message}</p>;

  return (
    <div>
      {user ? (
        <div>
          <h2>Perfil</h2>
          <p>ID: {user.id}</p>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
