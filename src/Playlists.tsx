import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "./Header"
import Table from "./Table"

const Playlists = () => {
    const { id } = useParams()
    const [data, setData] = useState<SongRes[]>()

    useEffect(() => {
        // get info from db by using the id
        // TODO: uncomment this
        /* get_playlist(id).then((data: SongRes[]) => setData(data)) */

        /* const res: resType[] = [
        *     {
        *         title: "The Sliding Mr. Bones (Next Stop, Pottersville)",
        *         genre: "Malcolm Lockyer",
        *         createdBy: 1,
        *         recordLabel: 3,
        *     },
        *     {
        *         title: "The Sliding Mr. Bones (Next Stop, Pottersville)",
        *         category: "Chat",
        *         createdBy: 38,
        *         podcast: "Hello Internet"
        *     }
        * ] */
        /* setData(res) */
    })
    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <h1 className="mt-3 text-white text-bold text-5xl">Playlist <span className="text-purple-300">{id}</span></h1>
            {
                data ?
                    <Table showPodcast={false} rows={data} />
                    : null
            }
        </div>
    )
}

export default Playlists
