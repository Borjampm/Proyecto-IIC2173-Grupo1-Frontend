import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import Registration from './registration/Registration'
import CompaniesList from './companies/CompaniesList';
import CompanyDetail from './companies/CompanyDetail';

function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/companies" element={<CompaniesList />} />
                <Route path="/stocks/:companyName" element={<CompanyDetail />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing