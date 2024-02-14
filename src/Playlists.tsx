import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { get_playlist_by_id } from "./api/creation"
import Header from "./Header"
import TableNew from "./Table.new"

const Playlists = () => {
    const { id } = useParams()
    const [data, setData] = useState<SongRes[]>([])
    const [playlist, setPlaylist] = useState<Playlist>()
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        if (id) {
            get_playlist_by_id(Number(id)).then((data) => setPlaylist(data))
        }
        // TODO: get songs in playlist

    }, [id])
    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <h1 className="mt-3 text-white text-bold text-5xl">Playlist <span className="text-purple-300">{playlist && playlist.playlist_name}</span></h1>
            {
                data ?
                    <TableNew rows={data} />
                    : null
            }
        </div>
    )
}

export default Playlists
