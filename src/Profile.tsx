import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import Header from "./Header"
import useSession from "./useSession"

const Profile = () => {
    const isValidSession = useSession()

    return (
        <div className="h-screen bg-black px-10 text-white">
            <Header />
            {isValidSession ?
                <div>you are logged in</div>
                : <div>you are NOT logged in</div>

            }

        </div>
    )
}

export default Profile
