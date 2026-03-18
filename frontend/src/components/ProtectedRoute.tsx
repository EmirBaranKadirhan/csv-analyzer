import { Navigate, Outlet } from 'react-router'

export default function ProtectedRoute() {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/" replace />  // replace ==> sayesinde login olmamis kisi geri tusuyla korunan sayfaya gitmemis olur
    }

    return <Outlet />           // token varsa ilgili child route'u gosterecek !
}