import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { get_playlist_by_id } from "./api/creation"
import Header from "./Header"
import TableNew from "./Table.new"

const Playlists = () => {
    const { id } = useParams()
    const [playlist, setPlaylist] = useState<Playlist>()
    const [message, setMessage] = useState<string>("")
    const [songs, setSongs] = useState<SongRes[]>([])

    useEffect(() => {
        if (id) {
            get_playlist_by_id(Number(id)).then((data) => setPlaylist(data)).catch(err => setMessage("There are no songs in this playlist"))
        }
    }, [id])

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <h1 className="mt-3 text-white text-bold text-5xl">Playlist <span className="text-purple-300">{playlist && playlist.playlist_name}</span></h1>
            <p className="text-violet-300">
                {message}
            </p>
            {
                playlist && playlist.songs ?
                    <TableNew rows={playlist.songs} />
                    : null
            }
        </div>
    )
}

export default Playlists
