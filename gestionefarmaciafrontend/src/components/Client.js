import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBarAdmin from "./NavBarAdmin"; // Importa la navbar
import AddUser from "./AddUser";
import AddFarmaco from "./AddFarmaco";
import UpdateClient from "./UpdateClient";
import UpdateFarmaco from "./UpdateFarmaco";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Client = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("farmaci");
  const [drugs, setDrugs] = useState([]);
  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);



 
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/api/getorders"
        );
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Errore nel caricamento degli ordini:", error);
      }
    };

   
 


  // Fetch lista Clienti
  const fetchClients = () => {
    fetch("http://localhost:8083/api/get")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error("Error fetching clients:", err));
  };

  // Fetch lista Farmaci
  const fetchFarmaci = () => {
    fetch("http://localhost:8083/api/getfarmaci")
      .then((res) => res.json())
      .then((data) => setDrugs(data))
      .catch((err) => console.error("Error fetching farmaci:", err));
  };

  // Controlla il percorso e aggiorna `activeTab`
  useEffect(() => {
    if (location.pathname.includes("clienti")) setActiveTab("clienti");
    else if (location.pathname.includes("farmaci")) setActiveTab("farmaci");
    else if (location.pathname.includes("ordini")) setActiveTab("ordini");
  }, [location]);

  useEffect(() => {
    if (activeTab === "farmaci") {
      fetchFarmaci();
    } else if (activeTab === "clienti") {
      fetchClients();
    }else if (activeTab === "ordini"){
      fetchOrders();
    }
  }, [activeTab]);
  const refreshDrugs = async () => {
    const response = await fetch("http://localhost:8083/api/getfarmaci");
    const data = await response.json();

    setDrugs(data);
  };

  const refreshClient = async () => {
    const response = await fetch("http://localhost:8083/api/get");
    const data = await response.json();
    setClients(data);
  };

  const onDeleteClient = async (id) => {
    try {
      const response = await fetch(`http://localhost:8083/api/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Aggiorna la lista dei clienti rimuovendo quello eliminato
        setClients((prevClienti) =>
          prevClienti.filter((cliente) => cliente.id !== id)
        );
        alert("Cliente eliminato con successo!");
      } else {
        console.error(
          "Errore durante l'eliminazione del cliente:",
          response.statusText
        );
        alert("Errore nell'eliminazione del cliente.");
      }
    } catch (error) {
      console.error("Errore durante la richiesta DELETE:", error);
      alert("Errore di rete o del server.");
    }
  };

  const OnDeleteFarmaco = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8083/api/deletefarmaco/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Aggiorna la lista dei clienti rimuovendo quello eliminato
        setDrugs((prevClienti) =>
          prevClienti.filter((cliente) => cliente.id !== id)
        );
        alert("farmaco eliminato con successo!");
      } else {
        console.error(
          "Errore durante l'eliminazione del farmaco:",
          response.statusText
        );
        alert("Errore nell'eliminazione del cliente.");
      }
    } catch (error) {
      console.error("Errore durante la richiesta DELETE:", error);
      alert("Errore di rete o del server.");
    }
  };

  // Funzioni di navigazione
  const onAddUser = () => navigate("/cliente/adduser");
  const onAddFarmaco = () => navigate("/cliente/addfarmaco");
  const onUpdateFarmaco = (id) => navigate(`/cliente/editdrug/${id}`);
  const onUpdateClient = (id) => navigate(`/cliente/editclient/${id}`);

  // Renderizza lista Farmaci
  const renderFarmaci = () => (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo</th>
            <th>Azione</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug.id}>
              <td>{drug.nome}</td>
              <td>{drug.descrizione}</td>
              <td>{drug.prezzo} €</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onUpdateFarmaco(drug.id)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => OnDeleteFarmaco(drug.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={onAddFarmaco}
        >
          Aggiungi Farmaco
        </button>
      </div>
    </div>
  );


  const OrdiniList = ({orders}) => (
    <div>
      <h4>I miei Ordini</h4>
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order.orderId} className="mb-4">
              <h5>Ordine #{order.orderId}</h5>
              <p>Prezzo Totale: €{order.prezzoTotale}</p>
              <p>IdUser: {order.userId}</p>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Id Farmaco</th>
                    <th>Quantità</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.drugId}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>Non hai ancora effettuato ordini.</p>
      )}
    </div>
  )
  // Renderizza lista Clienti
  const renderClienti = () => (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Role</th>
            <th>Password</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.nome}</td>
              <td>{client.email}</td>
              <td>{client.role}</td>
              <td>{client.password}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onUpdateClient(client.id)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteClient(client.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mt-3" onClick={onAddUser}>
          Aggiungi Cliente
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <NavBarAdmin setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="container mt-4">
        <Routes>
          {/* Path delle route */}
          <Route path="/farmaci" element={renderFarmaci()} />
          <Route path="/clienti" element={renderClienti()} />
          <Route path="/ordini" element={<OrdiniList orders={orders} />}/>
          <Route
            path="/adduser"
            element={<AddUser refreshClient={refreshClient} />}
          />
          <Route
            path="/addfarmaco"
            element={<AddFarmaco refreshDrugs={refreshDrugs} />}
          />
          <Route
            path="/editdrug/:id"
            element={<UpdateFarmaco refreshDrugs={refreshDrugs} />}
          />
          <Route
            path="/editclient/:id"
            element={<UpdateClient refreshClients={fetchClients} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Client;
