import { useNavigate, Route, Routes } from "react-router-dom";
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import { useToken } from "../context/AuthContext";
import { useEffect } from "react";

const RoutesProvider = () => {
  const { authenticated } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated){
      navigate('/login');
    } else {
      navigate('/veiculos')
    }
  }, [authenticated]);

  return (

    <Routes>
    <Route exact path="/veiculos" element={<Home />} />
    <Route exact path="/login" element={<Login />} />
    {/* <Route exact path="/*" element={<NotFound />} /> */}
  </Routes>
  );
}

export default RoutesProvider;
