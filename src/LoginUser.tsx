import { ChangeEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { login_user } from "./api/users";
import Button from "./Button";
import InputField from "./inputField";
import LoginJPG from "./login.jpeg";
import ArrowListener from "./assets/arrow_listener.svg";

const LoginUser = () => {
    const location = useLocation();
    const isArtist = location.pathname.includes("artist") ? true : false
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")

    const handleSubmit = () => {
        if (isArtist) {
            const data = {
                username,
                password: pass,
                isArtist
            }
            login_user(data)
        } else {
            const data = {
                username,
                password: pass,
                isArtist
            }
            login_user(data)
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center relative" id="background">
            <img className="h-full bg-cover w-full" src={LoginJPG} alt="hand of a DJ on a disk" />
            <div className="h-screen w-1/2 md:w-1/4 bg-black absolute flex justify-center items-center">
                <div className="h-2/5 text-white w-3/4">
                    <h3 className="text-2xl mb-3 ">
                        login as
                        {
                            isArtist ?
                                (
                                    <span className="mx-1.5">an <span className="text-violet-300"> artist</span></span>
                                ) :
                                (
                                    <span className="mx-1.5">a <span className="text-violet-300"> listener</span></span>
                                )
                        }
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
                            <div className="pl-4 flex justify-end">
                                register as
                                <Link to={"/login/" + (isArtist ? "listener" : "artist")}>
                                    {
                                        isArtist ? (
                                            <span className="text-violet-300 pl-1.5">lisener</span>
                                        ) : (

                                            <span className="text-violet-300 pl-1.5">artist</span>
                                        )
                                    }
                                </Link>
                            </div>
                            <img className="h-full" src={ArrowListener} alt="arrow to the left" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginUser
