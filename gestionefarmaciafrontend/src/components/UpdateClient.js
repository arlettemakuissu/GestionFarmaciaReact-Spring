
import { useState,useEffect } from "react";
import { useParams,useNavigate,useLocation } from "react-router-dom";
const UpdateClient = ({refreshClients}) =>{

    const { id } = useParams(); // Extract drug ID from the URL
    const navigate = useNavigate();
   const location = useLocation();
    const [formData, setFormData] = useState({
      nome: "",
      email: "",
      role: "",
      password:""
    });
    const [errorMessage, setErrorMessage] = useState("");
  
    // Fetch the drug details when the component loads

   
    useEffect(() => {
     fetch(`http://localhost:8083/api/user/${id}`) // Replace with your backend endpoint
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
      console.log(formData);
      fetch(`http://localhost:8083/api/update/${id}`, {
        method: "PUT", // Replace with the actual HTTP method your backend expects
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      
        
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update client.");
          }
          return response.json();
        })
        .then(() => {
            if (refreshClients) {
                
             refreshClients(); // Call the callback to refresh the client list
            }
            navigate("/cliente/clienti");
          })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    };
  
    return (
      <div className="container mt-4">
        <h3 className="text-center text-success">Modifica Cliente</h3>
  
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
              Nome 
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              id="email"
              name="email"
              
              value={formData.email}
              onChange={handleChange}
              required/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
             
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
             Password
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
             
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

export default UpdateClient