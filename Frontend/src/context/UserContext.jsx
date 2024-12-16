// this is a feature of react that is used to share the data across multiple components. we will be wrapping the main.jsx file between usercontext.... 2:52 sheriyans coding school

import React from 'react'
import { createContext } from'react'
import { useState } from 'react'


export const UserDataContext = createContext()

const UserContext = ( {children} ) => {

  //created the below useState for the context
  const [user, setUser] = useState({
    email:'',
    fullName:{
      firstName:'',
      lastName:''
    }
  })

  return (
    <div>
      <UserDataContext.Provider value={{user,setUser}}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext