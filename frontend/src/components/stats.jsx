export default function Stats({ leads }) {
  const total = leads.length;
  const newLeads = leads.filter(l => l.status === "new").length;
  const contacted = leads.filter(l => l.status === "contacted").length;
  const converted = leads.filter(l => l.status === "converted").length;

  return (
    <div className="stats-row">
      <div className="stat blue">
        <h4>Total Leads</h4>
        <p>{total}</p>
      </div>
      <div className="stat cyan">
        <h4>New</h4>
        <p>{newLeads}</p>
      </div>
      <div className="stat yellow">
        <h4>Contacted</h4>
        <p>{contacted}</p>
      </div>
      <div className="stat green">
        <h4>Converted</h4>
        <p>{converted}</p>
      </div>
    </div>
  );
}
