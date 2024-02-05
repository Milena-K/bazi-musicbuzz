import { ChangeEvent, useContext, useEffect, useState } from "react"
import Header from "./Header"
import InputField from "./inputField"
import { useMyContext } from "./SearchContext";
import SearchTab from "./SearchTab";
import Table from "./Table"

type CheckedItems = {
    title?: boolean;
    genre?: boolean;
    category?: boolean;
    createdBy?: boolean;
    recordLabel?: boolean;
    podcast?: boolean;
};


const Search = () => {
    const [rows, setRows] = useState<resType[]>()
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
    const { filter } = useMyContext()
    const data = ["rock", "pop", "edm", "classical"]

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked,
        });
    };

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
    }, [])

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <div>
                <h1 className="my-3 text-white text-bold text-5xl">Search</h1>
                <SearchTab data={data} />
            </div>
            {
                rows ?
                    <Table type="search" filter={filter} rows={rows} />
                    : null
            }
        </div>
    )
}

export default Search;
