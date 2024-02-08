import React, { createContext, ReactNode, useContext, useState } from 'react';

type MyContextType = {
    creations: SongRes[] | EpisodeRes[];
    setCreations: React.Dispatch<React.SetStateAction<SongRes[] | EpisodeRes[]>>;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    fields: Set<string>;
    setFields: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

const SearchContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [filter, setFilter] = useState<string>("");
    const [creations, setCreations] = useState<SongRes[] | EpisodeRes[]>([]);
    const [fields, setFields] = useState<Set<string>>(new Set());

    return (
        <MyContext.Provider value={{ filter, setFilter, fields, setFields, creations, setCreations }}>
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
