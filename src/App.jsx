import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import AuthPage from "./pages/authPage"

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App