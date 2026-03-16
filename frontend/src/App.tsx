import AuthPage from "./pages/AuthPage"
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App