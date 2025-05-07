// src/components/StatutCandidat.js
import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

const StatutCandidat = () => {
  const [statut, setStatut] = useState('En attente');
  const [resultat, setResultat] = useState('En attente');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStatut = async () => {
      try {
        const token = localStorage.getItem('token'); // On suppose que le token est stocké dans localStorage après la connexion
        const response = await apiClient.get('/api/candidats/statut', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStatut(response.data.statut);
        setResultat(response.data.resultat);
      } catch (error) {
        console.error('Erreur récupération statut :', error.response?.data?.error);
        setMessage("Impossible de récupérer votre statut !");
      }
    };
    fetchStatut();
  }, []);

  return (
    <div>
      {message ? (
        <p>{message}</p>
      ) : (
        <>
          <h3>Votre statut : {statut}</h3>
          <h4>Résultat du concours : {resultat}</h4>
        </>
      )}
    </div>
  );
};

export default StatutCandidat;
