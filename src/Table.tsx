import { useEffect, useState } from "react"
import AddButton from "./AddButton"


type tableProps = {
    showPodcast: boolean,
    filter?: string,
    rows: EpisodeRes[] | SongRes[]
}


const Table = ({ showPodcast, filter, rows }: tableProps) => {

    const tableRow = (
        <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td></td>
            <td>1961</td>
            <td>1961</td>
            <td>1961</td>
            <td>
                <button className="p-2 mr-2 rounded-md bg-purple-300 hover:bg-purple-400 active:bg-purple-500 text-black">play</button>
            </td>
            <td>
                <button className="p-2 rounded-md bg-purple-300 hover:bg-purple-400 active:bg-purple-500 text-black">add</button>
            </td>
        </tr>
    )

    return (
        <table className="text-white table-auto w-full border-separate border-spacing-4 " >
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
                            <td>{"song_title" in row ? row.song_title : row.episode_title}</td>
                            <td>
                                {"genres" in row ?
                                    row.genres
                                    : null
                                }
                            </td>
                            <td></td>
                            {/* <td>{row.createdBy}</td> */}
                            <td>{"rlabel_id" in row ? row.rlabel_id : ""}</td>
                            {
                                showPodcast ?
                                    <td>{"podcast_id" in row ? row.podcast_id : ""}</td>
                                    : null
                            }
                            <td>
                                <button className="p-2 rounded-md bg-purple-300 hover:bg-purple-400 active:bg-purple-500 text-black">play</button>
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
