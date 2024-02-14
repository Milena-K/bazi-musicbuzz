import { ChangeEvent, useContext, useEffect, useState } from "react"
import { get_categories, get_genres } from "./api/creation";
import { AuthContext } from "./AuthContext";
import { CreationType } from "./enums";
import Header from "./Header"
import InputField from "./inputField"
import { useSearchContext } from "./SearchContext";
import SearchTab from "./SearchTab";
import Table from "./Table.new"

const Search = () => {
    const { creations, collections, activeTab } = useSearchContext()
    const [categories, setCategories] = useState<Category[]>([])
    const [genres, setGenres] = useState<string[]>([])
    const { sessionUuid } = useContext(AuthContext)
    useEffect(() => {
        if (sessionUuid) {
            get_categories(sessionUuid).then(res => setCategories(res))
            get_genres(sessionUuid).then(res => setGenres(res))
        }
    }, [activeTab])

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <div>
                <h1 className="my-3 text-white text-bold text-5xl">Search</h1>
                <SearchTab categories={categories} genres={genres} />
            </div>
            {
                creations ?
                    <Table rows={creations} title={activeTab == CreationType.Song ? "Songs" : "Episodes"} />
                    : null
            }
            {
                collections ?
                    <Table rows={collections} title={activeTab == CreationType.Song ? "Albums" : "Podcasts"} />
                    : null
            }
        </div>
    )
}

export default Search;
