// src/components/VerificationEmail.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import apiClient from '../services/apiClient';

const VerificationEmail = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      const response = await apiClient.post('/api/candidats/verifier-email', { email, code });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Erreur :", error.response?.data?.error);
      setMessage("Code invalide ou expiré !");
    }
  };

  const handleResend = async () => {
    try {
      const response = await apiClient.post('/api/candidats/reenvoyer-code', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Erreur lors du renvoi du code");
    }
  };

  return (
    <div>
      <h3>Vérification de l’email</h3>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Code de vérification"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleVerify}>
        Valider mon email
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleResend} style={{ marginLeft: '10px' }}>
        Renvoyer le code
      </Button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerificationEmail;
