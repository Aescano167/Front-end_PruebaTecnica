import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import ProductPages from './pages/Products/products.pages';
import UsersPage from './pages/Users/users.pages';
import Header from "./components/layout/Header";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/>  
        <Routes>
          <Route exact path="/" element={<ProductPages />} />
          <Route path="/usuarios" element={<UsersPage />} />
          {/* Otras rutas */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
