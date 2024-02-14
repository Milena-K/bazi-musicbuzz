import { ChangeEvent, useContext, useState } from "react"
import InputField from "./inputField"
import { useSearchContext } from "./SearchContext"
import { CreationType } from "./enums"
import Button from "./Button"
import { get_albums, get_episodes, get_podcasts, get_songs } from "./api/creation"
import { AuthContext } from "./AuthContext"

type SearchTabProps = {
    categories: Category[]
    genres: string[]
}

const SearchTab = ({ categories, genres }: SearchTabProps) => {

    const { filter,
        setFilter,
        activeTab,
        setActiveTab,
        fields,
        setFields,
        setCreations,
        setCollections } = useSearchContext();
    const { sessionUuid } = useContext(AuthContext)

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
            if (sessionUuid) {
                get_songs(fields, filter, sessionUuid)
                    .then((songs: SongRes[]) => setCreations(songs))
                get_albums(fields, filter, sessionUuid)
                    .then((albums: AlbumRes[]) => setCollections(albums))
            }
        } else {
            if (sessionUuid) {
                get_episodes(fields, filter, sessionUuid)
                    .then((episodes) => setCreations(episodes))
                get_podcasts(fields, filter, sessionUuid)
                    .then((podcasts: PodcastRes[]) => setCollections(podcasts))
            }
        }
    }

    const switchTab = (tab: CreationType) => {
        setActiveTab(tab)
        setFields(new Set())
        setCollections([])
        setCreations([])
    }


    return (
        <div className="w-1/2 border rounded-lg border-purple-300">
            <div className="text-center grid grid-cols-2 justify-items-stretch">
                <button onClick={() => switchTab(CreationType.Song)} className={activeTab == CreationType.Song ? "bg-purple-300 text-black rounded-l-md" : ""}>
                    music
                </button>
                <button onClick={() => switchTab(CreationType.Podcast)} className={activeTab == CreationType.Podcast ? "bg-purple-300 text-black rounded-r-md" : ""}>
                    podcast
                </button>
            </div>
            <div className="grid grid-cols-2 text-center gap-3 p-3">
                {
                    activeTab == CreationType.Song ?
                        genres.map(value =>
                            <button onClick={() => handleSelect(value)}
                                key={value}
                                className={!fields.has(value) ? "border border-purple-300 rounded" : "border border-purple-300 rounded text-black bg-purple-300"}>
                                {value}
                            </button>
                        )
                        : categories.map(value =>
                            <button onClick={() => handleSelect(value.category_name)}
                                key={value.category_id}
                                className={!fields.has(value.category_name) ? "border border-purple-300 rounded" : "border border-purple-300 rounded text-black bg-purple-300"}>
                                {value.category_name}
                            </button>
                        )
                }
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
