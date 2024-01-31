import { useParams } from "react-router-dom"
import Header from "./Header"
import Table from "./Table"

const Playlists = () => {
    const { playlistName } = useParams()

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <h1 className="mt-3 text-white text-bold text-5xl">Playlist <span className="text-purple-300">{playlistName}</span></h1>
            <Table type="playlist" filter="" />
        </div>
    )
}

export default Playlists
