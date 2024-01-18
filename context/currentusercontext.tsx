"use client"
import { User } from "@prisma/client";
import React, {createContext, useContext} from "react";


interface CurrentUserContextProps  {
    currentUser : User | null;
    children: React.ReactNode;
}

interface CreateCurrentUserProps  {
    currentUser: User | null;
};
  

const userContext = createContext<CreateCurrentUserProps | null >(null)

export default function CurrentUserContext({
    currentUser,
    children
}: CurrentUserContextProps){
    return (
        <userContext.Provider value={{currentUser}}>
            {children}
        </userContext.Provider>
    )
}


export function useCurrentUser() {
    const currentUser = useContext(userContext);
    if (currentUser === null){
        throw new Error("useUser must be used within UserContextProvider")
    }
    return currentUser;
}


