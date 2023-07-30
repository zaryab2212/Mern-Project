import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLogedInUser, signOutAsync } from '../authSlice'
import { Navigate } from 'react-router-dom'

const LogOut = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectLogedInUser)

  useEffect(()=>{
        dispatch(signOutAsync( ))

  })
  
    return (
    <>
          {!user && <Navigate to="/login" replace= {true}></Navigate>}
    </>
  )
}

export default LogOut