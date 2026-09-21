import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// Wraps protected pages. Redirects to /login when not authenticated,
// and to / when the user role is not in allowedRoles (if provided).
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useSelector(store => store.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute
