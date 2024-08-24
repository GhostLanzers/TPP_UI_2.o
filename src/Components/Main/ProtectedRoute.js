import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const ProtectedRoute = ({ children, user, setUser }) => {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) navigate("/login");
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/status", {
          headers: {
            authorization: token,
          },
        });

        setUser({
          userMail: res.data.userMail,
          employeeType: res.data.employeeType,
          userid: res.data.userid,
          username: res.data.username,
        });
        setCheck(true);
      } catch (error) {
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate, setUser]);
  if (check) {
    return children;
  }
};

export default ProtectedRoute;
