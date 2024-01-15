import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "./Button"

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const buttonClass = "border w-max border-2 border-purple-400 rounded-lg bg-black text-black hover:font-bold"

    return (
        <div>
            <div className="flex flex-col items-center justify-center ">
                <h3 className="text-blue-400 text-center text-3xl ">
                    musicbuzz
                </h3>
                <div className="grid w-full justify-end grid-cols-3">
                    <div></div>
                    <div className="rounded-full bg-blue-400 h-24 w-24 mt-3 text-black text-center justify-self-center ">
                        <h3 className="h-fit mt-5">
                            pp
                        </h3>
                    </div>
                    <div className="text-black flex justify-end items-center gap-3 relative">
                        <Button label="playlists" onClick={() => {}} />
                        <Button label="search" onClick={() => {}} />
                        <Button label="upload" onClick={() => setShowMenu(!showMenu)} />
                        {
                            showMenu ?
                                (
                                    <div id="upload-menu"
                                        className="absolute text-black top-28 bg-purple-300
                                             text-nowrap gap-5 p-5 align-items-end
                                             w-96
                                             rounded-md grid grid-cols-2 grid-rows-2 ">
                                        <Link to="/upload/song">
                                            <Button className={buttonClass} label="upload a song" onClick={() => setShowMenu(!showMenu)} />
                                        </Link>
                                        <Link to="/upload/episode">
                                            <Button className={buttonClass} label="upload an episode" onClick={() => setShowMenu(!showMenu)} />
                                        </Link>
                                        <Link to="/create/album">
                                            <Button className={buttonClass} label="create an album" onClick={() => setShowMenu(!showMenu)} />
                                        </Link>
                                        <Link to="/create/podcast">
                                            <Button className={buttonClass} label="create a podcast" onClick={() => setShowMenu(!showMenu)} />
                                        </Link>
                                    </div>
                                ) : null
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header
