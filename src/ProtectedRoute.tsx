import { FC, ReactNode, useContext, useEffect, useState } from "react"
import { validate_session } from "./api/users"
import App from "./App"
import { AuthContext } from "./AuthContext"
import { UserType } from "./enums"
import Header from "./Header"

type ProtectedRouteT = {
    children: ReactNode
    userType?: UserType
}

const ProtectedRoute: FC<ProtectedRouteT> = ({ children, userType }) => {
    const [isValidSession, setIsValidSession] = useState(false)
    const { userId, sessionUuid } = useContext(AuthContext)

    const checkSession = () => {
        if (sessionUuid) {
            validate_session(sessionUuid).then((userData) => {
                if (userType) {
                    if (userData && userData.user_type == userType) {
                        setIsValidSession(true)
                    } else {
                        setIsValidSession(false)
                    }
                } else if (userData && !userType) {
                    setIsValidSession(true)
                } else {
                    setIsValidSession(false)
                }

            })
        }
    }

    useEffect(() => {
        checkSession()
    })

    if (!isValidSession) {
        if (userType && userId) {
            return <>
                <Header />
                <div className="text-white flex items-center text-center h-screen">
                    <p className="w-full"> only a user {userType} has access to do that</p>
                </div>
            </>
        } else {
            return <App />
        }
    } else {
        return <>{children}</>
    }
}


export default ProtectedRoute
