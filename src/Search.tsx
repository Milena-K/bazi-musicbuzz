import { ChangeEvent, useContext, useEffect, useState } from "react"
import Header from "./Header"
import InputField from "./inputField"
import { useSearchContext } from "./SearchContext";
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
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
    const { filter, creations } = useSearchContext()
    const data = ["rock", "pop", "edm", "classical"]

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked,
        });
    };

    /*
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
    */

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <div>
                <h1 className="my-3 text-white text-bold text-5xl">Search</h1>
                <SearchTab data={data} />
            </div>
            {
                creations ?
                    <Table showPodcast={true} filter={filter} rows={creations} />
                    : null
            }
        </div>
    )
}

export default Search;
