import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api-service";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const item = JSON.parse(token);
      apiService.updateActive("users", item.user.id, { active: true });
      const expItem = new Date(item.expDate);
      const now = new Date();
      if (
        now.getTime() > expItem
        // || !item.user.isAdmin
      ) {
        localStorage.clear("token");
        apiService.updateActive("users", item.user.id, { active: false });
        navigate("/login");
        window.location.reload(true);
      }
    }
  }, []);

  return (
    <>
        {children}
    </>
  );
};

export default ProtectedRoute;
