import { useEffect, useState } from "react"
import { get_user_info } from "./api/users"

const useSession = () => {
    const [isValidSession, setIsValidSession] = useState(false)


    useEffect(() => {
        const validateSession = async (sessionUuid: string) => {
            const userData = await get_user_info(sessionUuid);
            return !!sessionUuid
        }

        const sessionUuid = window.localStorage.getItem("sessionUuid")

        if (sessionUuid) {
            validateSession(sessionUuid).then(isValid => setIsValidSession(isValid))
        }
    }, [])
    return isValidSession
}

export default useSession
