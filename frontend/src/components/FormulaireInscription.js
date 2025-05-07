// src/components/FormulaireInscription.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import apiClient from '../services/apiClient';

const FormulaireInscription = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post('/api/candidats/inscription', data);
      alert(response.data.message);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.response?.data?.error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Nom"
        {...register("nom", { required: true })}
        error={!!errors.nom}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Prénom"
        {...register("prenom", { required: true })}
        error={!!errors.prenom}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        {...register("email", { 
          required: true, 
          pattern: { value: /^\S+@\S+$/i, message: "Email invalide" }
        })}
        error={!!errors.email}
        helperText={errors.email && "Entrez un email valide"}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Téléphone"
        {...register("telephone", { required: true })}
        error={!!errors.telephone}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        S’inscrire
      </Button>
    </form>
  );
};

export default FormulaireInscription;
