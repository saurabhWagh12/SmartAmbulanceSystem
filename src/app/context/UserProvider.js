'use client'
import React, { useState } from 'react'
import UserContext from './UserContext';

function UserProvider({children}) {
    const [username,setUsername] = useState(null);
  return (
    <UserContext.Provider value={{username,setUsername}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider