import AuthPage from "./pages/AuthPage"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </div>
  )
}

export default App