
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    let isAutheticated = localStorage.getItem("authToken")
    return isAutheticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
