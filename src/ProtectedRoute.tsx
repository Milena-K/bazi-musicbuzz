import { FC, ReactNode, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { validate_session } from "./api/users"
import App from "./App"

type ProtectedRouteT = {
    children: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteT> = ({ children }) => {
    const [isValidSession, setIsValidSession] = useState(false)

    const checkSession = async () => {
        const sessionUuid = window.localStorage.getItem("sessionUuid")

        console.log(`before if ${sessionUuid}`)
        if (sessionUuid) {
            const val = await validate_session(sessionUuid).then((value) => {
                console.log(`in await ${value}`)
                setIsValidSession(value)
            })
            console.log(`in if ${val}`)
        }
    }

    useEffect(() => {
        checkSession()
        console.log("useEffect")
        console.log(isValidSession)

    }, [])



    return isValidSession ? <>{children}</> : <App />
}
/*

    if (!isValidSession) {
        console.log(`near the end ${isValidSession}`)
        return <Navigate to="/" />
    }
*/


export default ProtectedRoute
