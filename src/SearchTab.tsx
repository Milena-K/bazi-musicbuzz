import { ChangeEvent, useState } from "react"
import InputField from "./inputField"
import { useSearchContext } from "./SearchContext"
import { CreationType } from "./enums"
import Button from "./Button"
import { get_episodes, get_songs } from "./api/creation"

type SearchTabProps = {
    data: string[]
}

const SearchTab = ({ data }: SearchTabProps) => {

    const [activeTab, setActiveTab] = useState<CreationType>(CreationType.Song)
    const { filter, setFilter, fields, setFields, setCreations } = useSearchContext();

    const handleSelect = (value: string) => {
        if (fields.has(value)) {
            removeFromSet(value)
        } else {
            addToSet(value)
        }
    }

    const addToSet = (value: string) => {
        const newFields = new Set(fields);
        newFields.add(value);
        setFields(newFields);
    };

    const removeFromSet = (value: string) => {
        const newFields = new Set(fields);
        newFields.delete(value);
        setFields(newFields);
    };

    const handleSearch = async () => {
        if (activeTab == CreationType.Song) {
            console.log("inside song")
            get_songs(fields, filter).then((songs: SongRes[]) => { setCreations(songs); console.log(songs) })
        } else {
            get_episodes(fields, filter).then((episodes) => { setCreations(episodes); console.log(episodes) })
        }
    }


    return (
        <div className="w-1/2 border rounded-lg border-purple-300">
            <div className="text-center grid grid-cols-2 justify-items-stretch">
                <button onClick={() => { setActiveTab(CreationType.Song); setFields(new Set()) }} className={activeTab == CreationType.Song ? "bg-purple-300 text-black rounded-l-md" : ""}>
                    songs
                </button>
                <button onClick={() => { setActiveTab(CreationType.Podcast); setFields(new Set()) }} className={activeTab == CreationType.Podcast ? "bg-purple-300 text-black rounded-r-md" : ""}>
                    podcasts
                </button>
            </div>
            <div className="grid grid-cols-2 text-center gap-3 p-3">
                {
                    data.map(value =>
                        <button onClick={() => handleSelect(value)}
                            key={value}
                            className={!fields.has(value) ? "border border-purple-300 rounded" : "border border-purple-300 rounded text-black bg-purple-300"}>
                            {value}
                        </button>
                    )}
            </div>
            <div className="w-full flex p-3">
                <InputField
                    value={filter}
                    className="bg-transparent h-12 border-purple-300 border-2 placeholder:text-purple-300 mr-2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
                    name="title"
                    placeholder="search" />
                <button onClick={handleSearch} className="bg-purple-300 text-black rounded-lg h-12 p-3 mt-2.5">search</button>
            </div>
        </div>
    )
}

export default SearchTab

