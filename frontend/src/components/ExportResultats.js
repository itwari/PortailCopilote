// src/components/ExportResultats.js
import React, { useState } from "react";
import apiClient from "../services/apiClient";

const ExportResultats = () => {
  const [message, setMessage] = useState("");

  const handleExport = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.get("/api/admin/export-resultats", {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` }
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "resultats.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'exportation");
    }
  };

  return (
    <div>
      <h3>Exporter les résultats</h3>
      <button onClick={handleExport}>Télécharger Excel</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExportResultats;
