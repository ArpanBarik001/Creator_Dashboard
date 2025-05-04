import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./component/Login.js";
import Signin from "./component/Signin.js";
import Dashboard from "./component/Dashboard.js";
import Activity from "./component/Activity.js";
import AdminDashboard from "./component/AdminDashboard.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/activity" element={<Activity/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
     </BrowserRouter>
  );
}

export default App;
