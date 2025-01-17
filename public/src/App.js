import "./App.css";
import Menu from "./Component/Main Menu/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRecord from "./Component/CreateRecord/CreateRecord";
import ViewRecord from "./Component/ViewRecord/ViewRecord";
import EditRecord from "./Component/EditRecord/EditRecord";
import FormsHome from "./Component/FormsCollection/FormsHome";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/view-record" element={<ViewRecord />} />
          <Route path="/create-record" element={<CreateRecord />} />
          <Route path="/edit-record" element={<EditRecord />} />
          <Route path="/create-form" element={<FormsHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
