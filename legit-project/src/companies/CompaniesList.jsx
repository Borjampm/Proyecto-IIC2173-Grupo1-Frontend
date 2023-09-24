import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import './CompaniesList.css'
import axios from 'axios'
import { API_URL } from '../config'

function CompaniesList() {
    const [apiResponse, setApiResponse] = useState(null)

    const [msg, setMsg] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios
            .get(`${API_URL}/companies/all`) 
            .then((response) => {
                setApiResponse(response.data);
                setMsg("Empresas obtenidas correctamente");
            })
            .catch((error) => {
                setMsg(`Error al obtener las empresas ${error}`)
            });
        }, []
    );
 
    return (
        <div className="companies-v-container">
            <p>{ msg }</p>
            <h1>Companies</h1>
            <div className="companies">
                { 
                    apiResponse ? (
                        apiResponse.map((company) =>
                            <Link key={company.symbol} to={`/companies/${company.symbol}`}>
                                <div className="company">
                                    <p>{ company.symbol }</p>
                                    <p>{ company.price }</p>
                                    <h3>{ company.shortName }</h3>
                                </div>
                            </Link>
                        )
                    ) : (
                        <p>Loading companies...</p>
                    )
                }
            </div>
        </div>
    )

}

export default CompaniesList
