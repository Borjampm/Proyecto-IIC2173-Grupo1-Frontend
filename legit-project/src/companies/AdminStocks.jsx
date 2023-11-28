import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';
import { API_URL } from '../config.js';
import { ADMIN_SUB } from "../config.js";

function AdminStocks() {
    const [groupStocks, setGroupStocks] = useState(null)

    useEffect(() => {
        axios
            .get(`${API_URL}/transactions/${ADMIN_SUB}`)
            .then((response) => {
                setGroupStocks(response.data.stocks_data);
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    const handleRedirect = (url) => {
        
    };

    return (
        <>
            <h1>Grupo 1 Stocks</h1>
            {
                groupStocks ? (
                    groupStocks.length > 0 ? (
                        groupStocks.map(function (stock, i) {
                            return (
                                <>
                                    <p key={i}>
                                        Compania: {stock.CompanyId} | 
                                        Fracción Disponible: {stock.Quantity} | 
                                        Fracción Usada: {stock.Price} | 
                                        Precio: {stock.Completed ? "true" : "false"}
                                    </p>
                                    <button onClick={() => handleRedirect(pdfUrl)}>Comprar Fracción</button>
                                </>
                            );
                        })
                    ) : (
                        <Link to="/companies">
                            <button>Buy your first stock</button>
                        </Link >
                    )
                ) : (
                    <p>Loading stocks...</p>
                )}
        </>
    )

}

export default AdminStocks;
