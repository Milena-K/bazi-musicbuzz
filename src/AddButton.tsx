import { useContext, useEffect, useState } from "react"
import { add_song_to_playlist, get_playlists } from "./api/creation"
import { AuthContext } from "./AuthContext"

type propType = {
    song_id?: number
}


const AddButton = ({ song_id }: propType) => {

    const [playlists, setPlaylists] = useState<PlaylistInfo[]>()
    const [showMenu, setShowMenu] = useState(false)
    const { sessionUuid } = useContext(AuthContext)

    const addToPlaylist = (playlist_id: number) => {
        const sessionUuid = window.localStorage.getItem("sessionUuid")
        if (sessionUuid && song_id) {
            const data = {
                playlist_id,
                song_id,
            }
            add_song_to_playlist(data, sessionUuid).then(res => console.log(res))
        }
    }

    useEffect(() => {
        if (sessionUuid) {
            get_playlists(sessionUuid).then((res: PlaylistRes[]) => {
                const data = res.map(r => ({
                    id: r.playlist_id,
                    name: r.playlist_name
                }))
                setPlaylists(data)
            })
        }
    }, [])

    return (

        <div className="inline-block relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-md bg-purple-300
                            hover:bg-purple-400 active:bg-purple-500
                            text-black">add</button>
            {
                showMenu ?
                    <div className="absolute grid text-black mt-3 right-0 min-w-32
                            bg-white text-nowrap z-10
                            align-items-end overflow-y-scroll h-60
                            rounded-md ">
                        {
                            playlists?.length ?
                                playlists?.map(playlist =>
                                    <button key={playlist.id}
                                        onClick={() => { addToPlaylist(playlist.id); setShowMenu(false) }}
                                        className="p-3 rounded-md hover:bg-purple-300 h-fit">
                                        {playlist.name}</button>
                                )
                                : <p className="text-black">create a playlist</p>

                        }
                    </div>
                    : null
            }
        </div>

    )
}

// addToPlaylist(playlist); setShowMenu(false)
export default AddButton
