import { FC, useContext, useEffect, useState } from "react"
import AddButton from "./AddButton"
import { get_user_info } from "./api/users"
import { AuthContext } from "./AuthContext"
import { useSearchContext } from "./SearchContext"

type ResUnion = EpisodeRes[] | SongRes[] | PodcastRes[] | AlbumRes[]

type TableProps = {
    rows: ResUnion
    title?: string
}

const TableNew: FC<TableProps> = ({ rows, title }) => {
    const [columnNames, setColumnNames] = useState<string[]>([])
    const [user, setUser] = useState<Buzzer>()
    const { sessionUuid } = useContext(AuthContext)

    const isEpisodeRes = (value: any[]): value is EpisodeRes[] => {
        return value.every((item) => 'episode_id' in item);
    };
    const isPodcastRes = (value: any[]): value is PodcastRes[] => {
        return value.every((item) => 'podcast_title' in item);
    };
    const isSongRes = (value: any[]): value is SongRes[] => {
        return value.every((item) => 'song_title' in item);
    };
    const isAlbumRes = (value: any[]): value is AlbumRes[] => {
        return value.every((item) => 'album_title' in item);
    };

    useEffect(() => {
        let names: string[] = [];
        if (rows.length) {
            if (isEpisodeRes(rows)) {
                names = ['Ep Number', 'Title', 'Duration', 'Description', 'File']
                setColumnNames(names)
            } else if (isSongRes(rows)) {
                names = ['Title', 'Duration', 'Album', 'Lyrics', 'Record Label', 'Date', 'File', 'Genres']
                setColumnNames(names)
            } else if (isAlbumRes(rows)) {
                names = ['Title', 'Created By', 'Record Label']
                setColumnNames(names)
            } else if (isPodcastRes(rows)) {
                names = ['Title', 'Created By']
            }
        }
        if (sessionUuid) {
            get_user_info(sessionUuid).then(res => setUser(res))
        }
        setColumnNames(names)
    }, [rows])

    return (
        <>
            {
                rows.length ? <h1 className="my-3 text-white text-bold text-5xl">{title}</h1> : null
            }
            <table className="text-white table-auto text-center mt-4 border-separate border-spacing-3.5" >
                <thead>
                    <tr>
                        {
                            columnNames.map(name => <th key={name}>{name}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map(row => {
                            if (typeof row == 'object' && row !== null && "episode_id" in row) { // EpisodeRes
                                return (
                                    <tr key={row.episode_id}>
                                        <td>{row.episode_number}</td>
                                        <td>{row.episode_title}</td>
                                        <td>{row.episode_duration}</td>
                                        <td>{row.episode_description}</td>
                                        <td>{row.episode_file}</td>
                                    </tr>
                                )
                            } else if (typeof row == 'object' && row !== null && 'song_title' in row) { // SongRes
                                return (
                                    <tr key={row.song_id}>
                                        <td>{row.song_title}</td>
                                        <td>{row.song_duration}</td>
                                        <td>{row.album_id}</td>
                                        <td>{row.lyrics.substring(0, 20) + '...'}</td>
                                        <td>{row.rlabel_id}</td>
                                        <td>{typeof row.song_date == "string" ? row.song_date : ""}</td>
                                        <td>{row.song_file}</td>
                                        <td>{row.genres?.join(",")}</td>
                                        <td>
                                            {
                                                user && user.user_type == 'listener' &&
                                                <AddButton song_id={row.song_id} />
                                            }
                                        </td>
                                    </tr>
                                )
                            } else if (typeof row == 'object' && row !== null && 'podcast_title' in row) { // PodcastRes
                                return (
                                    <tr key={row.category_id}>
                                        <td>{row.podcast_title}</td>
                                        <td>{row.created_by}</td>
                                    </tr>
                                )
                            } else if (typeof row == 'object' && row !== null && 'album_title' in row) { // AlbumRes
                                return (
                                    <tr key={row.album_id}>
                                        <td>{row.album_title}</td>
                                        <td>{row.al_created_by}</td>
                                        <td>{row.rlabel_id}</td>
                                    </tr>
                                )
                            }
                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default TableNew
