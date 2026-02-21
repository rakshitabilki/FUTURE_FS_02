import { useEffect, useState } from "react";
import API from "../api";
import LeadCard from "../components/LeadCard";
import Stats from "../components/Stats";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const fetchLeads = async () => {
    const { data } = await API.get("/leads");
    setLeads(data);
  };

  useEffect(() => { fetchLeads(); }, []);

  const addLead = async () => {
    await API.post("/leads", form);
    setForm({ name: "", email: "", message: "" });
    fetchLeads();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        <div className="top-bar">
          <h1>Leads Dashboard</h1>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        <Stats leads={leads} />

        <div className="content-grid">

          <div>
            {leads.map((lead) => (
              <LeadCard key={lead._id} lead={lead} refresh={fetchLeads} />
            ))}
          </div>

          <div className="new-lead-card">
            <h2>➕ New Lead</h2>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button onClick={addLead}>Add</button>
          </div>

        </div>
      </div>
    </div>
  );
}
