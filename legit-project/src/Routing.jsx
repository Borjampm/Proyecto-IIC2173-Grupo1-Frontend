import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import Registration from './registration/Registration'
import MyProfile from './user/MyProfile'
import MyStocks from './user/MyStocks'
import LogIn from './user/LogIn';
import CompaniesList from './companies/CompaniesList';
import CompanyDetail from './companies/CompanyDetail';

function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                {/* <Route path="/registration" element={<Registration />} /> */}
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/my-stocks" element={<MyStocks />} />
                <Route path="/log-in" element={<LogIn />} />
                {/* <Route path="/registration" element={<Registration />} /> */}
                <Route path="/stocks" element={<CompaniesList />} />
                <Route path="/stocks/:companyName" element={<CompanyDetail />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing