import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";
const Login = () => {

  const {setUser} = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const navigate = useNavigate();

  const  handleSubmit = async (e)=>{
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:8083/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        console.log("eeee")
        if (response.ok) {
          const userData = await response.json();
          setUser(userData)
           // Otteniamo l'utente dal backend
         console.log(userData.role);
          if (userData.role === "admin") {
            navigate("/admin"); // Naviga alla pagina Admin
          } else if (userData.role === "client") {
            navigate("/cliente/farmaci"); // Naviga alla pagina Cliente
          }
        } else {
          setMessage("Invalid username or password.");
        }
      } catch (err) {
        setMessage("Something went wrong. Please try again later.");
    }
    };

 
    return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title text-center">LOGIN</h5>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Inserisci username"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Inserisci password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 text-center" >
            LOGIN
          </button>
        </form>
        {message && <p className="mt-3 text-danger">{message}</p>}
      </div>
    </div>
  );

};
export default Login;
