import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Navbar from "./components/navbar";
import Home from './views/home.view';
import VeterinarianList from "./views/veterinarian.list.view";
import SearchOwner from "./views/search.owner.view";
import OwnerList from "./views/owner.list.view";
import OwnerDetails from "./views/owner.details.view";
import EditOwner from "./views/edit.owner.view";
import AddOwner from "./views/add.owner.view";
import AddPet from "./views/add.pet.view";
import EditPet from "./views/edit.pet.view";
import AddVisit from "./views/add.visit.view";
import Error from "./views/error.view";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/owners/search" element={<SearchOwner />} />
            <Route path="/owners/search/:lastName" element={<OwnerList />} />
            <Route path="/owners/list" element={<OwnerList />} />
            <Route path="/owners/new" element={<AddOwner />} />
            <Route path="/owners/:id" element={<OwnerDetails />} />
            <Route path="/owners/:id/edit" element={<EditOwner />} />
            <Route path="/owners/:id/pets/new" element={<AddPet />} />
            <Route path="/owners/:ownerId/pets/:petId/edit" element={<EditPet />} />
            <Route path="/owners/:ownerId/pets/:petId/visits/new" element={<AddVisit />} />
            <Route path="/veterinarians" element={<VeterinarianList />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;