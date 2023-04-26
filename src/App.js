import "./App.css";
import Authform from "./components/authform";
import Dash from "./pages/Dash";
import Signin from "./pages/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/" element={<Authform />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/chat" element={<ChatPage />} />
          
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
