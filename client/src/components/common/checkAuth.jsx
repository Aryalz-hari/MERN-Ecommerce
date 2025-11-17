import { useLocation,Navigate } from "react-router-dom";

import React from "react";

const CheckAuth = ({isAuthenticated, user, children}) => {
  const location= useLocation();
  if(!isAuthenticated && !(location.pathname.includes('/login')|| location.pathname.includes('/register'))){
    return <Navigate to="/auth/login"/>
  }
  if(isAuthenticated && (location.pathname.includes('/login')|| location.pathname.includes('/register'))){
    if(user?.role==='admin'){
      return <Navigate to="/admin/dashboard"/>
    }
    else {
      return <Navigate to="/shop/home"/>
    }
  }
  if(isAuthenticated && user?.role!=='admin'&& location.pathname.includes('admin')){
    return <Navigate to="/unauth"/>
  }
  if(isAuthenticated && user?.role==='admin'&& location.pathname===('/admin')){
    return <Navigate to ="/admin/dashboard"/>
  }
  return <>{children}</>
}

export default CheckAuth;
