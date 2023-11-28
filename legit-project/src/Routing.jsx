import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import MyProfile from './user/MyProfile'
import MyStocks from './user/MyStocks'
import LogIn from './user/LogIn';
import CompaniesList from './companies/CompaniesList';
import CompanyDetail from './companies/CompanyDetail';
import Validation from './transaction/validation';
import MyPredictions from './user/MyPredictions';
import Prediction from './user/Prediction';
import ExternalApi from './ExternalApi';
import Auctions from './admin/Auctions';
import AdminStocks from './companies/AdminStocks';

function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/my-stocks" element={<MyStocks />} />
                <Route path="/log-in" element={<LogIn />} />
                <Route path="/companies" element={<CompaniesList />} />
                <Route path="/companies/:companySymbol" element={<CompanyDetail />} />
                <Route path="/validate-transaction" element={<Validation />} />
                <Route path="/my-predictions" element={<MyPredictions />} />
                <Route path="/my-predictions/:predictionId" element={<Prediction />} />
                <Route path="/external-api" element={<ExternalApi />} />
                <Route path="/admin/auctions" element={<Auctions />} />
                <Route path="/grupo-1/stocks" element={<AdminStocks />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing
