import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/routes";

export const Products = (props) => {

    const navigate = useNavigate();

    return <div>
        <p>Products</p>
        <button onClick={() => {
            localStorage.clear();
            navigate(AppRoutes.sign_in);
        }} >Log out</button>
    </div>
}