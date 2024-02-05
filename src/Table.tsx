import { useEffect, useState } from "react"
import AddButton from "./AddButton"


type tableProps = {
    type: "search" | "playlist",
    filter?: string,
    rows: resType[]
}


const Table = ({ type, filter, rows }: tableProps) => {

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
        <table className="text-white table-auto border-separate border-spacing-4 " >
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre / Category</th>
                    <th>Created By</th>
                    <th>Record Label</th>
                    {
                        type == "search" ?
                            <th>Podcast</th>
                            : null
                    }
                </tr>
            </thead>
            <tbody>
                {
                    rows?.map(row => (
                        <tr key={row.title + row.category}>
                            <td>{row.title}</td>
                            <td>{row.genre} {row.category}</td>
                            <td>{row.createdBy}</td>
                            <td>{row.recordLabel}</td>
                            {
                                type == "search" ?
                                    <td>{row.podcast}</td>
                                    : null
                            }
                            <td>
                                <button className="p-2 rounded-md bg-purple-300 hover:bg-purple-400 active:bg-purple-500 text-black">play</button>
                            </td>
                            {
                                row.genre ?
                                    <td>
                                        <AddButton song={row} />
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
