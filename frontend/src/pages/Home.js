// src/pages/Home.js
import React from "react";
import Menu from '../components/Menu';
import FormulaireInscription from "../components/FormulaireInscription";
import VerificationEmail from "../components/VerificationEmail";
import StatutCandidat from "../components/StatutCandidat";

const Home = () => {
  return (
    <div>
         <Menu />
      <h2>Bienvenue sur le portail du concours</h2>
      {/* Affiche alternativement le formulaire d'inscription et la vérification, selon ton flux logique.
          Par exemple, après inscription rediriger l'utilisateur vers la vérification.
          On affiche aussi le statut une fois que l'email est validé. */}
      <FormulaireInscription />
      <VerificationEmail />
      <StatutCandidat />
    </div>
  );
};

export default Home;
