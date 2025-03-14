
import { useState,useEffect } from "react";
import { useNavigate,useParams} from "react-router-dom";



const UpdateFarmaco = ({refreshDrugs}) =>{

    const { id } = useParams(); // Extract drug ID from the URL
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      nome: "",
      descrizione: "",
      prezzo: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
  
    // Fetch the drug details when the component loads
    useEffect(() => {
      fetch(`http://localhost:8083/api/getfarmaco/${id}`) // Replace with your backend endpoint
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch drug details.");
          }
          return response.json();
        })
        .then((data) => {
            
          setFormData(data); // Pre-fill the form with fetched data
          
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }, [id]);
  
    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch(`http://localhost:8083/api/updatefarmaco/${id}`, {
        method: "PUT", // Replace with the actual HTTP method your backend expects
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update drug.");
          }
          return response.json();
        })
        .then(() => {
          if(refreshDrugs){
            refreshDrugs();
          }
          navigate("/cliente/farmaci")
          ; // Redirect to the drug list component
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    };
  
    return (
      <div className="container mt-4">
        <h3 className="text-center text-success">Modifica Farmaco</h3>
  
        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}
  
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-info"
            style={{ maxWidth: "500px", margin: "0 auto" }} >
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
            <button type="submit" className="btn btn-success">
              Salva Modifiche
            </button>
          </div>
        </form>
      </div>
    );
  }




    


export default UpdateFarmaco