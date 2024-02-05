import { ChangeEvent, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { login_user } from "./api/users";
import Button from "./Button";
import InputField from "./inputField";
import LoginJPG from "./login.jpeg";
import ArrowListener from "./assets/arrow_listener.svg";
import { AuthContext } from "./AuthContext";

const LoginUser = () => {
    const location = useLocation();
    const isArtist = location.pathname.includes("artist") ? true : false
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const { login } = useContext(AuthContext)

    const handleSubmit = async () => {
        const data = {
            user_name: username,
            user_password: pass,
        }
        const loginData = await login_user(data)
        if (loginData) {
            login(loginData.session_uuid)
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center relative" id="background">
            <img className="h-full bg-cover w-full" src={LoginJPG} alt="hand of a DJ on a disk" />
            <div className="h-screen w-1/2 md:w-1/4 bg-black absolute flex justify-center items-center">
                <div className="text-white w-3/4 ">
                    <Link to="/" className="mb-16">
                        <h3 className="text-blue-400 text-center text-3xl">
                            musicbuzz
                        </h3>
                    </Link>
                    <h3 className="text-2xl mb-3 mt-9">
                        login
                    </h3>
                    <div className="text-black">
                        <InputField
                            value={username}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            name="username"
                            placeholder="username" />
                        <InputField
                            type="password"
                            value={pass}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                            name="password"
                            placeholder="password" />

                        <div className="flex mt-2.5 justify-end">
                            <Button type="submit" label="login" onClick={handleSubmit} />
                        </div>
                        <div className="text-white mt-10 w-fit">
                            <div className="text-sm pl-4 flex justify-end">
                                do you want to
                                <Link to={"/register"}>
                                    <span className="text-violet-300 pl-1.5">register?</span>
                                </Link>
                            </div>
                            <img className="h-full w-full" src={ArrowListener} alt="arrow to the left" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginUser
