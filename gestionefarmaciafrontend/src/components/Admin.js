import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
const Admin = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await fetch("http://localhost:8083/api/getfarmaci");
        const data = await response.json();
        setDrugs(data);
      } catch (error) {
        console.error("Errore nel caricamento dei farmaci:", error);
      }
    };

    fetchDrugs();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8083/api/orders/${user.id}`
        );
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Errore nel caricamento degli ordini:", error);
      }
    };

    if (user && user.id) {
      fetchOrders();
    }
  }, [user]);

  const addToCart = (drug) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === drug.id);
      if (existing) {
        return prevCart;
      } else {
        return [...prevCart, { ...drug, quantita: 1 }];
      }
    });
  };

  const removeFromCart = (drugId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== drugId));
  };

  const updateQuantity = (drugId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === drugId ? { ...item, quantita: Math.max(1, quantity) } : item
      )
    );
  };
  const validateOrder = async () => {
    if (cart.length === 0) {
      alert("Il carrello è vuoto!");
      return;
    }

    try {
      const payload = {
        userId: user.id,
        items: cart.map((item) => ({
          drugId: item.id,
          quantity: item.quantita,
          price: item.prezzo,
        })),
      };

      console.log("Payload inviato:", payload);

      const response = await fetch("http://localhost:8083/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Errore nella creazione dell'ordine:", error);
        alert("Errore nel convalidare l'ordine.");
        return;
      }
      alert("Ordine creato con successo!");

      const updatedOrdersResponse = await fetch(
        `http://localhost:8083/api/orders/${user.id}`
      );
      const updatedOrders = await updatedOrdersResponse.json();
  
      // Aggiorna lo stato con tutti gli ordini
      setOrders(updatedOrders || []); // Sostituisce i vecchi ordini con quelli aggiornati
      navigate("/admin/ordini");
    } catch (error) {
      console.error("Errore durante la validazione dell'ordine:", error);
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "green" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand text-white">FarmaciaArlette</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/admin/farmaci" className="nav-link text-white">
                  Farmaci
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/ordini" className="nav-link text-white">
                  I miei Ordini
                </Link>
              </li>
            </ul>
          </div>
          <button className="btn btn-danger" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/farmaci" />} />
          <Route
            path="/farmaci"
            element={
              <div className="row">
                <div className="col-md-8">
                  <FarmaciList drugs={drugs} addToCart={addToCart} />
                </div>
                <div className="col-md-4">
                  <Carrello
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                  <button className="btn btn-primary" onClick={validateOrder}>
                    Valida Ordine
                  </button>
                </div>
              </div>
            }
          />
          <Route path="/ordini" element={<OrdiniList orders={orders} />} />
        </Routes>
      </div>
    </div>
  );
};

const FarmaciList = ({ drugs, addToCart }) => (
  <div>
    <h4>Lista dei Farmaci</h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrizione</th>
          <th>Quantita</th>
          <th>Prezzo</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {drugs.map((drug) => (
          <tr key={drug.id}>
            <td>{drug.nome}</td>
            <td>{drug.descrizione}</td>
            <td>{drug.quantita}</td>
            <td>€{drug.prezzo}</td>
            <td>
              <button
                className="btn btn-success btn-sm"
                onClick={() => addToCart(drug)}
              >
                Aggiungi
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Carrello = ({ cart, removeFromCart, updateQuantity }) => (
  <div>
    <h4>Carrello</h4>
    {cart.length > 0 ? (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Prezzo</th>
            <th>Quantità</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>€{item.prezzo}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantita}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="form-control form-control-sm"
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Il carrello è vuoto.</p>
    )}
  </div>
);

const OrdiniList = ({ orders }) => (
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
                  <th> Farmaco</th>
                  <th>Quantità</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nome}</td>
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
);

export default Admin;
