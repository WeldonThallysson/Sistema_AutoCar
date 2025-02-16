import {ReactNode, createContext,useState,useEffect} from 'react'
import {auth} from '../services/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

interface AuthProviderProps {
    children: ReactNode
}

type AuthContextData = {
    signed:boolean
    loadingAuth: boolean
    handleInfoUser: ({name,email,uid}: UserProps) => void
    user: UserProps | null
}

type UserProps = {
    uid: string;
    name: string | null;
    email: string | null;
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}: AuthProviderProps){
    const [user,setUser] = useState<UserProps | null>(null)
    const [loadingAuth,setLoadingAuth] = useState(true);
  
    function handleInfoUser({name,email,uid}: UserProps){
        setUser({
            name,
            email,
            uid
        })
    }
     
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser({
                    uid:user.uid,
                    name:user.displayName,
                    email: user.email
                })
                setLoadingAuth(false)
            }else {
                 setUser(null)
                 setLoadingAuth(false)
            }
        })

        return () => {
            unsub();
        }
    },[])

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            loadingAuth,
            handleInfoUser,
            user
        }}>
            {children}
            </AuthContext.Provider>
    )
}


export default AuthProvider;