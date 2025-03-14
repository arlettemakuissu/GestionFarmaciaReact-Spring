const ListFarmacia = () => {
  const drugs = [
    {
      nome: "Paracetamolo",
      descrizione: "Antipiretico e analgesico",
      prezzo: "5.00€",
    },
    { nome: "Ibuprofene", descrizione: "Antinfiammatorio", prezzo: "7.50€" },
    { nome: "Amoxicillina", descrizione: "Antibiotico", prezzo: "12.00€" },
    {
      nome: "Aspirina",
      descrizione: "Antinfiammatorio e anticoagulante",
      prezzo: "4.00€",
    },
  ];

  return (
    <div className="mt-3">
      <h3 className="text-center">Lista dei Farmaci Disponibile</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <tr key={index}>
              <td>{drug.nome}</td>
              <td>{drug.descrizione}</td>
              <td>{drug.prezzo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListFarmacia;
