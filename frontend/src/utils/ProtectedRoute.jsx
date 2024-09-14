import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({user,children,redirect='/login'}) => {
 
  console.log('divya',user)
  if(!user){
    return <Navigate to={redirect} />
  }
  else{
    return children ? children : <Suspense fallback={<div>Loading...</div>}><Outlet /></Suspense>
  }
}

export default ProtectedRoute