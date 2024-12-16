import React, { useContext, useEffect} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
    }, [token])

    if(!token){
        navigate('/login');
    }

  return (
    <div>{children}</div>
  )
}

export default UserProtectedWrapper