import LoginJPG from "./login.jpeg";
import QMark from "./assets/qmark.svg";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center relative" id="background">
            <img className="h-full bg-cover w-full" src={LoginJPG} alt="hand of a DJ on a disk" />
            <div className="h-screen w-1/2 md:w-1/4 bg-black absolute flex justify-center items-center">
                <div className="h-2/5 text-white w-3/4">
                    <div className="h-full text-2xl mb-3 flex justify-center gap-10">
                        <div className="grid content-between">
                            login as
                            <div className="text-end">
                                <Link to="/login/artist">
                                    <span className="text-violet-300"> artist</span>
                                </Link>
                            </div>
                            <div>or </div>
                            <div className="text-end">
                                <Link to="/login/listener">
                                    <span className="text-violet-300"> listener</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex h-full flex justify-bottom">
                            <img src={QMark} alt="question mark" className="mt-auto h-1/2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
