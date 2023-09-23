import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import './CompaniesList.css'
import axios from 'axios'

function CompaniesList() {

    const API_URL = 'http://localhost:8000'    // URL de la API

    const [companies, setCompanies] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después

    const [msg, setMsg] = useState("");     // Variable que almacena el mensaje de error
    const [page, setPage] = useState(1);

    // const companies = [                   // Este es el formato en el que se tienen que recuperar los datos de la API
    //     {"shortName": "Apple Inc.", "symbol": "AAPL"},
    //     {"shortName": "Microsoft Corporation", "symbol": "MSFT"},
    //     {"shortName": "Amazon.com, Inc.", "symbol": "AMZN"}
    // ]

    useEffect(() => {              // Envía los datos al backend para hacer efectivo el registro
        axios.get(`${API_URL}/companies/all?page=${page}`) 
          .then((response) => {
            setCompanies(response.data);
            console.log(response.data, "companies")
            setMsg("Empresas obtenidas correctamente");
          })
          .catch((error) => {
            setMsg(`Error al obtener las empresas ${error}`)
          });
      }, []);

 
    return (
        <>
            <div className="companies-v-container">
                <p>{ msg }</p>
                <h1>Companies</h1>
                {/* <form id="change-page" className="form">
                    <div className="field">
                        <label htmlFor="number">Page</label>
                        <input type="number" name="page" id="page" value={page} onChange={e => setPage(e.target.value)} required />
                    </div>
                </form> */}
                    <div className="companies">
                        { companies ? (
                            companies.map((company) =>
                                <Link key={company.symbol} to={`/stocks/${company.symbol}`}>
                                    <div className="company">
                                        <p>{ company.symbol }</p>
                                        <p>{ company.price }</p>
                                        <h3>{ company.shortName }</h3>
                                    </div>
                                </Link>
                            )) : (
                                <p>Loading companies...</p>
                            )
                        }
                    </div>
                </div>
                

        </>
    )

}

export default CompaniesList
