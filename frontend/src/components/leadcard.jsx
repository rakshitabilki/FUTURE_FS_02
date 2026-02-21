import { useState } from "react";
import API from "../api";

export default function LeadCard({ lead, refresh }) {
  const [note, setNote] = useState("");

  const updateStatus = async (status) => {
    await API.put(`/leads/${lead._id}/status`, { status });
    refresh();
  };

  const addNote = async () => {
    if (!note) return;
    await API.put(`/leads/${lead._id}/note`, { note });
    setNote("");
    refresh();
  };

  const deleteLead = async () => {
    await API.delete(`/leads/${lead._id}`);
    refresh();
  };

  return (
    <div className="lead-card">
      <h3>👤 {lead.name}</h3>
      <p>📧 {lead.email}</p>

      <div className="status-row">
        <span>Status:</span>
        <span className={`status-badge ${lead.status}`}>
          {lead.status}
        </span>
      </div>

      <div className="btn-row">
        <button className="contacted"
          onClick={() => updateStatus("contacted")}>
          📞 Contacted
        </button>

        <button className="converted"
          onClick={() => updateStatus("converted")}>
          ✔ Converted
        </button>
      </div>
<div className="note-row">
  <input
    placeholder="Add follow-up note..."
    value={note}
    onChange={(e) => setNote(e.target.value)}
  />
  <button onClick={addNote}>+ Add</button>
</div>

{lead.notes && lead.notes.length > 0 && (
  <div className="notes-section">
    <h4>📝 Follow-ups:</h4>
    {lead.notes.map((n, index) => (
      <div key={index} className="note-item">
        • {n}
      </div>
    ))}
  </div>
)}


      <button className="delete-btn" onClick={deleteLead}>
        🗑 Delete
      </button>
    </div>
  );
}
