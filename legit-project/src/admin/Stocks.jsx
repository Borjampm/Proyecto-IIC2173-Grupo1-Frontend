import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import { API_URL } from '../config'
import { AdminContext } from './AdminContext';

const AdminStocks = () => {
    const { isAdmin } = useContext(AdminContext);

    const [apiResponse, setApiResponse] = useState(null)

    useEffect(() => {
        axios
            .get(`${API_URL}/companies/all`)
            .then((response) => {
                setApiResponse(response.data);
            })
            .catch((error) => {
                console.log(`Error al obtener las empresas ${error}`)
            });
        }, []
    );

    return(
        <>
            { isAdmin ? (
                <>
                    <h1>Comprar Stocks Grupo 1</h1>

                    <>
                        {
                            apiResponse ? (
                                apiResponse.map((company) =>
                                    <div key={company.symbol}>
                                        <p>=====================</p>
                                        <div>
                                            <h3>{company.shortName}</h3>
                                            <p>{company.symbol}</p>
                                            <p>{company.price}</p>
                                        </div>
                                        <Link key={company.symbol} to={`/companies/${company.symbol}`}>
                                            Ver Página de Detalles
                                        </Link>
                                        <p>=====================</p>
                                    </div>
                                )
                            ) : (
                                <p>Loading companies...</p>
                            )
                        }
                    </>
                </>
            ) : (
                <>
                    <h1>No tienes permisos para ver esto!</h1>
                </>
            )}
        </>
    )
}

export default AdminStocks;