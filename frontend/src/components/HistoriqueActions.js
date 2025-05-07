// src/components/HistoriqueActions.js
import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const HistoriqueActions = () => {
  const [historique, setHistorique] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchHistorique = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.get("/api/historique", {
        headers: { Authorization: `Bearer ${token}` },
        params: { admin_id: adminId, start_date: startDate, end_date: endDate }
      });
      setHistorique(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

  useEffect(() => {
    fetchHistorique();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Historique des actions</h3>
      <div>
        <label>Admin ID:</label>
        <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} placeholder="ID Admin" />
        <label>Date de début:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>Date de fin:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={fetchHistorique}>Filtrer</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Admin</th>
            <th>Action</th>
            <th>Fichier</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {historique.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.admin_id}</td>
              <td>{entry.action}</td>
              <td>{entry.fichier}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoriqueActions;
