// src/components/ImportCandidats.js
import React, { useState } from "react";
import apiClient from "../services/apiClient";

const ImportCandidats = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Veuillez sélectionner un fichier au format .xlsx");
    }
  };

  const handleImport = async () => {
    if (!file) {
      setMessage("Aucun fichier sélectionné !");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.post("/api/admin/import-candidats", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'importation");
    }
  };

  return (
    <div>
      <h3>Importer une liste de candidats</h3>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleImport}>Importer</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImportCandidats;
