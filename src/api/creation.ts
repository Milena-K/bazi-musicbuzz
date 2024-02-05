/*
 *
interface Creation {
    date: Date,
    duration: number,
    createdBy: number,
}

interface Song extends Creation {
    albumId: number,
    recordLabel: number,
    lyrics: string,
    title: string,
    filePath: string
}

 */

async function get_episodes(categories: Set<string>, search_string: string): Promise<Episode[]> {
    const categories_query = Array.from(categories).map(category => `category=${category}&`).join("")
    const search_query = search_string ? search_string : ""
    const query = categories_query + "search_string=" + search_query

    return await fetch(`/get_songs?${query}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}


async function get_songs(genres: Set<string>, search_string: string): Promise<Song[]> {
    const genres_query = Array.from(genres).map(genre => `genre=${genre}&`).join("")
    const search_query = search_string ? search_string : ""
    const query = genres_query + "search_string=" + search_query

    // const song: Song = {
    //     date: new Date(),
    //     duration: 1,
    //     createdBy: 1,
    //     albumId: 1,
    //     recordLabel: 1,
    //     lyrics: "lala",
    //     title: "lili",
    //     filePath: "lyly"
    // }

    // return new Promise<Song[]>((resolve) => resolve([song]))
    return await fetch(`${process.env.API_URL}/get_songs?${query}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

export { get_songs, get_episodes }
