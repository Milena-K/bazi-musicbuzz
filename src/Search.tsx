import { ChangeEvent, useState } from "react"
import Header from "./Header"
import InputField from "./inputField"
import Table from "./Table"

const Search = () => {
    const [filter, setFilter] = useState("")

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <h1 className="mt-3 text-white text-bold text-5xl">Search</h1>
            <div className="w-1/3">
                <InputField
                    value={filter}
                    className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
                    name="title"
                    placeholder="title" />
            </div>
            <Table type="search" filter={filter} />
        </div>
    )
}

export default Search
