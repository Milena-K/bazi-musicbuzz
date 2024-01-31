import { useEffect, useState } from "react"
import AddButton from "./AddButton"

type tableProps = {
    type: "search" | "playlist",
    filter: string
}

type resType = {
    title: string,
    genre?: string,
    category?: string,
    podcast?: string,
    createdBy: number,
    recordLabel?: number,
}

const Table = ({ type, filter }: tableProps) => {
    const [rows, setRows] = useState<resType[]>()

    useEffect(() => {
        // get info from db
        // const res = await search(filter)
        const res: resType[] = [
            {
                title: "The Sliding Mr. Bones (Next Stop, Pottersville)",
                genre: "Malcolm Lockyer",
                createdBy: 1,
                recordLabel: 3,
            },
            {
                title: "The Sliding Mr. Bones (Next Stop, Pottersville)",
                category: "Chat",
                createdBy: 38,
                podcast: "Hello Internet"
            }
        ]
        setRows(res)
    })

    const tableRow = (
        <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td></td>
            <td>1961</td>
            <td>1961</td>
            <td>1961</td>
            <button className="p-2 mr-2 rounded-md bg-purple-300 hover:bg-purple-400 active:bg-purple-500 text-black">play</button>
            <button className="p-2 rounded-md bg-purple-300 hover:bg-purple-400 active:bg-purple-500 text-black">add</button>
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
                        <tr>
                            <td>{row.title}</td>
                            <td>{row.genre} {row.category}</td>
                            <td>{row.createdBy}</td>
                            <td>{row.recordLabel}</td>
                            {
                                type == "search" ?
                                    <td>{row.podcast}</td>
                                    : null
                            }
                            <button className="p-2 mr-2 rounded-md bg-purple-300 hover:bg-purple-400 active:bg-purple-500 text-black">play</button>
                            {
                                row.genre ?
                                    <AddButton song={row} />
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
