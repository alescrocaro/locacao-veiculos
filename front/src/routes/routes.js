import { useEffect, Suspense } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import { useToken } from "../context/AuthContext";
import { Layout } from "antd";
import LoadingPage from "../pages/loadingPage";

const RoutesProvider = () => {
  const { authenticated, loading } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated){
      navigate('/login');
    } else {
      navigate('/home')
    }
  }, [authenticated]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/rental-requests" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
  }

export default RoutesProvider;
