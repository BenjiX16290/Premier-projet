import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Category from "./Components/category/Category";

import Mecanic from "./Components/category/Mecanic";
import IndoorDiy from "./Components/category/IndoorDiy";
import OutdoorDiy from "./Components/category/OutdoorDiy";
import Pool from "./Components/category/Pool";

import Home from "./Components/home/Home";
import Contact from "./Components/Contact";
import Login from "./Components/user/Login";
import Register from "./Components/user/Register";
import Dashboard from "./Components/admin/Dashboard";
import AddUpdateArticle from "./Components/admin/AddUpdateArticle";
import Comment from "./Components/admin/Comment";
import Message from "./Components/admin/Message";
import userCheckAuth from "./hook/UserCheckAuth";
import ProtectedRoute from "./HOC/ProtectedRoute";
import Footer from "./Components/Footer";

function App() {
  const [user, isLoading] = userCheckAuth();
  if (isLoading) {
    return <p>Chargement ...</p>;
  }
  return (
    <>
    <div id="contain-global">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Category" element={<Category />} />

          <Route path="/Mecanic" element={<Mecanic />} />
          <Route path="/IndoorDiy" element={<IndoorDiy />} />
          <Route path="/OutdoorDiy" element={<OutdoorDiy />} />
          <Route path="/Pool" element={<Pool />} />

          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute element={Dashboard} requiredRole="admin" />
            }
          />
          <Route
            path="/AddUpdateArticle"
            element={
              <ProtectedRoute element={AddUpdateArticle} requiredRole="admin" />
            }
          />
          <Route
            path="/Comment"
            element={<ProtectedRoute element={Comment} requiredRole="admin" />}
          />

          <Route
            path="/Message"
            element={<ProtectedRoute element={Message} requiredRole="admin" />}
          />

          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
      <Footer />
      </div>
    </>
  );
}

export default App;
