import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import DashboardCliente from "./pages/DashboardCliente/DashboardCliente";
import Cadastro from "./pages/Cadastro/Cadastro";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/admin"
        element={<DashboardAdmin />}
      />

      <Route
        path="/cliente"
        element={<DashboardCliente />}
      />

      <Route
        path="/cadastro"
        element={<Cadastro />}
      />

    </Routes>

  );
}

export default App;