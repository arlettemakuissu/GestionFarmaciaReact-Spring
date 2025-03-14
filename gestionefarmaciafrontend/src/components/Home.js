import ListFarmacia from "./ListFarmacia";
import Login from "./Login";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <div>
      <>
        <NavBar />
        <div className="container mt-3">
          <div className="row">
          
            <div className="col-md-8">
              <ListFarmacia />
            </div>
            <div className="col-md-4">
              <Login />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
