import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../models/routes'
const AuthGuard = () => {
    const user = useSelector(store => store.user);
    let path = '';
    if( user.role?.administrador )path = PrivateRoutes.POS;
    if( user.role?.cajero )path = PrivateRoutes.POS;
    if( user.role?.cocina )path = PrivateRoutes.KITCHEN;
  
    return path.length > 0 ?  <Outlet replace to={path}/>: <Navigate replace to={PublicRoutes.LOGIN}/>
}

export default AuthGuard