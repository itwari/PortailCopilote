import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await apiClient.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setMessage("Connexion réussie !");
      
      const role = response.data.role; // Récupérer le rôle depuis la réponse
      if (role === "super_admin") {
        navigate("/admin"); // Redirige vers le dashboard admin
      } else {
        navigate("/"); // Redirige vers la page d’accueil des candidats
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Erreur de connexion !");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Connexion
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Mot de passe"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Se connecter
      </Button>
      {message && <Typography color="error" style={{ marginTop: "10px" }}>{message}</Typography>}
    </div>
  );
};

export default Login;
