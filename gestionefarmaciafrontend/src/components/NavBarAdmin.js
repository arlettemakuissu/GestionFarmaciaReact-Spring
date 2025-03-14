import {useNavigate} from "react-router-dom";





const NavBarAdmin = ({ setActiveTab, activeTab }) => {
  const navigate = useNavigate();

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    if (tab === "farmaci") navigate("/cliente/farmaci");
    else if (tab === "clienti") navigate("/cliente/clienti");
    else if (tab === "ordini") navigate("/cliente/ordini");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Cliente Dashboard</span>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <button
              className={`btn btn-link ${
                activeTab === "farmaci" ? "text-warning" : "text-white"
              }`}
              onClick={() => handleNavigation("farmaci")}
            >
              Farmaci
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn btn-link ${
                activeTab === "clienti" ? "text-warning" : "text-white"
              }`}
              onClick={() => handleNavigation("clienti")}
            >
              Clienti
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn btn-link ${
                activeTab === "ordini" ? "text-warning" : "text-white"
              }`}
              onClick={() => handleNavigation("ordini")}
            >
              Ordini
            </button>
          </li>
        </ul>
        <button className="btn btn-danger" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBarAdmin;
  
 

