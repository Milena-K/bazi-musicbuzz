import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { get_playlists } from "./api/creation"
import { get_user_info } from "./api/users"
import { AuthContext } from "./AuthContext"
import Button from "./Button"

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [playlists, setPlaylists] = useState<PlaylistInfo[]>([])
    const [showPlaylists, setShowPlaylists] = useState(false)
    const buttonClass = "border w-max border-2 border-purple-400 rounded-lg bg-black text-black hover:font-bold"
    const [user, setUser] = useState<Buzzer>()
    const { logout, sessionUuid } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionUuid) {
            get_playlists(sessionUuid).then(res => {
                const data = res.map(r => ({
                    name: r.playlist_name,
                    id: r.playlist_id
                }))
                setPlaylists(data)
            })
            get_user_info(sessionUuid).then(res => setUser(res))
        }
    }, [showPlaylists])

    return (
        <div>
            <div className="flex flex-col items-center justify-center ">
                <Link to="/profile">
                    <h3 className="text-blue-400 text-center text-3xl ">
                        musicbuzz
                    </h3>
                </Link>
                <div className="grid w-full justify-end grid-cols-3">
                    <div></div>
                    <div className="rounded-full bg-blue-400 h-24 w-24 mt-3 text-black text-center justify-self-center ">
                        <h3 className="h-fit mt-5">
                            pp
                        </h3>
                    </div>
                    <div className="text-black flex justify-end items-center gap-3 relative">
                        {
                            user && user.user_type == 'listener' &&
                            <div className="relative w-1/2">
                                <Button label="playlists" className="w-full" onClick={() => { setShowPlaylists(!showPlaylists); setShowMenu(false) }} />
                                {
                                    showPlaylists ?
                                        (
                                            <div className="absolute grid text-black mt-3 right-0
                                            bg-white text-nowrap z-10 min-w-full
                                            align-items-end overflow-y-scroll min-h-min
                                            rounded-md">

                                                {
                                                    playlists.length == 0 ?
                                                        <div className="p-3">please create a playlist</div>
                                                        : playlists.map(playlist =>
                                                            <Link to={"/playlist/" + playlist.id}
                                                                className="p-3 rounded-md hover:bg-purple-300 h-fit"
                                                                key={playlist.id}>
                                                                <button className="w-full" onClick={() => setShowPlaylists(false)} >
                                                                    {playlist.name}
                                                                </button>
                                                            </Link>
                                                        )
                                                }
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                        }
                        <Link className="w-1/2" to="/search">
                            <Button className="w-full" label="search" onClick={() => {}} />
                        </Link>
                        <div className="relative w-1/2">
                            <Button label="upload" className="w-full" onClick={() => { setShowMenu(!showMenu); setShowPlaylists(false) }} />
                            {
                                showMenu ?
                                    (
                                        <div id="upload-menu"
                                            className="absolute text-black mt-3 bg-purple-300
                                             text-nowrap gap-5 p-5 align-items-end
                                             w-96 right-0
                                             rounded-md grid grid-cols-2 grid-rows-2 ">
                                            {
                                                user?.user_type == 'artist' ?
                                                    <>
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
                                                    </>
                                                    :

                                                    <Link to="/create/playlist">
                                                        <Button className={buttonClass} label="create a playlist" onClick={() => setShowMenu(!showMenu)} />
                                                    </Link>

                                            }
                                        </div>
                                    ) : null
                            }
                        </div>
                        <Button label="logout" onClick={() => { logout(); navigate("/") }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
