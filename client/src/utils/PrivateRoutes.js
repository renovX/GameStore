import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'
const PrivateRoutes = ({ isLogged }) => {
    return (
        isLogged ? <Outlet /> : <Navigate to="/auth/signin" />
    )
}

export default PrivateRoutes