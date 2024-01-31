import { useEffect, useState } from "react"

type resType = {
    title: string,
    genre?: string,
    category?: string,
    podcast?: string,
    createdBy: number,
    recordLabel?: number,
}

type propType = {
    song: resType
}

const AddButton = ({ song }: propType) => {

    const [playlists, setPlaylists] = useState<string[]>([])
    const [showMenu, setShowMenu] = useState(false)

    const addToPlaylist = (playlist: string) => {
        // call db to add song to playlist
        const data = {

        }
    }

    useEffect(() => {
        // get playlists from db
        const res = ["playlist1", "playlist2", "playlist3"]
        setPlaylists(res)
    })


    return (

        <div className="inline-block relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-md bg-purple-300 hover:bg-purple-400 active:bg-purple-500 text-black">add</button>
            {
                showMenu ?
                    <div className="absolute grid text-black mt-3 right-0 min-w-32
                            bg-white text-nowrap
                            align-items-end
                            rounded-md ">
                        {playlists.map(playlist =>
                            <button onClick={() => { addToPlaylist(playlist); setShowMenu(false) }} className="p-3 rounded-md hover:bg-purple-300">{playlist}</button>
                        )}
                    </div>
                    : null
            }
        </div>

    )
}

export default AddButton
