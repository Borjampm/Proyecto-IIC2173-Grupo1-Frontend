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
                                    <Link key={company.symbol} to={`/companies/${company.symbol}`}>
                                        <div className="company">
                                            <div className="company-text">
                                                <h3>{ company.shortName }</h3>
                                                <p>{ company.price }</p>
                                                <p>{ company.symbol }</p>
                                            </div>
                                        </div>
                                    </Link>
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