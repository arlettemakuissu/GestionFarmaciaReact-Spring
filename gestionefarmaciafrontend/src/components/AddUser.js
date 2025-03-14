
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddUser = ({refreshClient}) =>{
 const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        role: "",
        password: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post("http://localhost:8083/api/user", formData);
      
          // If the request was successful, proceed
          if (response.status === 201 || response.status === 200) { 
            //alert("Cliente aggiunto con successo!");
            refreshClient();
            
            setFormData({ nome: "", email: "", role: "", password: "" });
      
            // Navigate to the "cliente/clienti" page
            navigate("/cliente/clienti");
          }
        } catch (error) {
          console.error("Errore durante l'aggiunta del cliente:", error);
          alert("Si è verificato un errore. Riprova.");
        }
      };
     
    
      return (
        <div className="container mt-5">
          <h3 className="text-center mb-4 text-blue">Aggiungi Cliente</h3>
          <form
            className="p-4 shadow rounded bg-info"
            style={{ maxWidth: "500px", margin: "0 auto" }}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="form-control"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Inserisci il nome"
                required
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Inserisci l'email"
                required
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Ruolo
              </label>
              <select
                id="role"
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Seleziona il ruolo</option>
                <option value="ADMIN">Admin</option>
                <option value="CLIENT">Client</option>
              </select>
            </div>
    
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Inserisci la password"
                required
              />
            </div>
    
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Aggiungi Cliente
              </button>
            </div>
          </form>
        </div>
      );
    };



    


export default AddUser