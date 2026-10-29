import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { useContext } from "react"
import { AuthContext } from "../auth/contexts/AuthContext"
import { ClonApp } from "../ClonApp"


export const BaseRouter = () => {
    const { authState } = useContext(AuthContext);
    return (
        <>
            <Routes>
                <Route path="/login" element={ authState.logged ? <Navigate to="/" replace /> : <LoginPage/> } />
                <Route path="/" element={ authState.logged ? <ClonApp/> : <Navigate to="/login" replace /> } />
                {/* <Route path="/about-us" element={ <AboutUsPage /> } />
                <Route path="/support" element={ <SupportPage/> } />
                <Route path="/login" element={ <LoginPage/> } /> */}

                <Route path="/*" element= { <Navigate to="/" /> } />
            </Routes>
        </>
    )
}
