import { Link } from "react-router-dom";

function CompaniesList() {

    let companies;     // Variable que almacena los datos de la API para utilizarlo después

    const [msg, setMsg] = useState("");     // Variable que almacena el mensaje de error

    const getCompanies = async() => {      // Envía los datos al backend para hacer efectivo el registro
        axios.get(`${API_URL}/companies-names`, {
        }).then((response) => {
            companies = response.data.companies;
            setMsg("Empresas obtenidas correctamente");
        }).catch((error) => {
            setMsg(`Error al obtener las empresas ${error.response.data.message}`)
        })
    }
    getCompanies()

    return (
        <>
            <div className="companies-list">
                <p>{ msg }</p>
                <div className="companies">
                    { companies.map((company) => {
                        <Link to={`/companies/${company.symbol}`}>
                            <div className="company-list-item">
                                <p>{company.shortName}</p>
                            </div>
                        </Link>
                    })}
                </div>
                
                

            </div>
        </>
    )

}

export default CompaniesList
