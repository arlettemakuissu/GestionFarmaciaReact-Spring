import {  useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFarmaco = ({refreshDrugs}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    descrizione: "",
    prezzo: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [drugs,setDrugs] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
      try {
        const response = await axios.post("http://localhost:8083/api/farmaci", formData);
    
        // If the request was successful, proceed
        if (response.status === 201 || response.status === 200) { 
          //alert("Cliente aggiunto con successo!");
          refreshDrugs();
          
          setFormData({ nome: "", descrizione: "", prezzo: "" });
    
          // Navigate to the "cliente/clienti" page
          navigate("/cliente/farmaci");
        }
      
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 text-primary">
        Aggiungi un Nuovo Farmaco
      </h3>

      {/* Success and Error Messages */}
      {successMessage && (
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow rounded bg-info "
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome Farmaco
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descrizione" className="form-label">
            Descrizione
          </label>
          <textarea
            className="form-control"
            id="descrizione"
            name="descrizione"
            rows="3"
            value={formData.descrizione}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="prezzo" className="form-label">
            Prezzo (€)
          </label>
          <input
            type="number"
            className="form-control"
            id="prezzo"
            name="prezzo"
            value={formData.prezzo}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Aggiungi Farmaco
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFarmaco;
