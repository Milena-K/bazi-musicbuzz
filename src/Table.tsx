import { useEffect, useState } from "react"
import AddButton from "./AddButton"


type tableProps = {
    showPodcast: boolean,
    rows: EpisodeRes[] | SongRes[]
}


const Table = ({ showPodcast, rows }: tableProps) => {

    return (
        <table className="text-white table-auto text-center mt-4 border-separate border-spacing-3.5" >
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Created By</th>
                    <th>Record Label</th>
                    {
                        showPodcast ?
                            <th>Podcast</th>
                            : null
                    }
                </tr>
            </thead>
            <tbody>
                {
                    rows?.map((row: SongRes | EpisodeRes) => (
                        <tr key={"song_id" in row ? row.song_id : row.episode_id}>
                            <td className="text-left">{"song_title" in row ? row.song_title : row.episode_title}</td>
                            <td>
                                {"genres" in row ?
                                    row.genres
                                    : null
                                }
                            </td>
                            <td></td>
                            {/* <td className="border border-purple-300">{row.createdBy}</td> */}
                            <td>{"rlabel_id" in row ? row.rlabel_id : ""}</td>
                            {
                                showPodcast ?
                                    <td>{"podcast_id" in row ? row.podcast_id : ""}</td>
                                    : null
                            }
                            <td>
                                <button className="ml-9 p-2 rounded-md bg-purple-300 hover:bg-purple-400 active:bg-purple-500 text-black">play</button>
                            </td>
                            {
                                "genres" in row ?
                                    <td>
                                        <AddButton song_id={row.song_id} />
                                    </td>
                                    : null
                            }
                        </tr>

                    ))
                }
            </tbody>
        </table>

    )
}

export default Table
