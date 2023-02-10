import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const item = JSON.parse(token);
      const expItem = new Date(item.expDate);
      const now = new Date();
      if (
        now.getTime() > expItem
        // || !item.user.isAdmin
      ) {
        localStorage.clear("token");
        navigate("/login");
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
