import AuthPage from "./pages/AuthPage"
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";


function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  )
}

export default App