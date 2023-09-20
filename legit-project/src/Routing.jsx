import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import Registration from './registration/Registration'
import MyProfile from './user/MyProfile'

function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/my-profile" element={<MyProfile />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing