import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CreationType } from './enums';

type MyContextType = {
    activeTab: CreationType;
    setActiveTab: React.Dispatch<React.SetStateAction<CreationType>>;
    creations: SongRes[] | EpisodeRes[];
    setCreations: React.Dispatch<React.SetStateAction<SongRes[] | EpisodeRes[]>>;
    collections: PodcastRes[] | AlbumRes[];
    setCollections: React.Dispatch<React.SetStateAction<PodcastRes[] | AlbumRes[]>>;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    fields: Set<string>;
    setFields: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

const SearchContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [filter, setFilter] = useState<string>("");
    const [creations, setCreations] = useState<SongRes[] | EpisodeRes[]>([]);
    const [collections, setCollections] = useState<PodcastRes[] | AlbumRes[]>([]);
    const [fields, setFields] = useState<Set<string>>(new Set());
    const [activeTab, setActiveTab] = useState<CreationType>(CreationType.Song);

    return (
        <MyContext.Provider value={{
            activeTab,
            setActiveTab,
            filter,
            setFilter,
            fields,
            setFields,
            creations,
            setCreations,
            collections,
            setCollections
        }}>
            {children}
        </MyContext.Provider>
    );
};

export const useSearchContext = (): MyContextType => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within a SearchContextProvider');
    }
    return context;
};

export default SearchContextProvider
