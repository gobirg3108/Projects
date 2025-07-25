import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserProvider from "./context/UserContext";
import Dashboard from "./pages/Dashboard";
import EditResume from "./components/EditResume";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/resume/:resumeId" element={<EditResume />}></Route>
      </Routes>

      <Toaster
        toastOptions={{
          className: " ",
          style: {
            fontSize: "13px",
          },
        }}
      ></Toaster>
    </UserProvider>
  );
}

export default App;
