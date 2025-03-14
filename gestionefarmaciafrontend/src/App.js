import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from "./components/Admin";
import Client from "./components/Client";


function App() {
  return (
  
<div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/cliente/*" element={<Client />} />
        
      </Routes>
    </Router>
  
      
    </div>
  );
}

export default App;
