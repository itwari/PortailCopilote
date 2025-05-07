// src/pages/AdminDashboard.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import ImportCandidats from "../components/ImportCandidats";
import ExportResultats from "../components/ExportResultats";
import HistoriqueActions from "../components/HistoriqueActions";
import { getUserRole } from "../services/authService";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = getUserRole(); // Cette fonction doit extraire le rôle depuis le token (ex. décodage JWT)
    if (role !== "admin" && role !== "super_admin") {
      navigate("/"); // Redirection si l'utilisateur n'a pas les privilèges
    }
  }, [navigate]);

  return (
    <div>
      <Menu />
      <h2>Tableau de bord administrateur</h2>
      <ImportCandidats />
      <ExportResultats />
      <HistoriqueActions />
    </div>
  );
};

export default AdminDashboard;
