const url = ""

async function get_episodes(categories: Set<string>, search_string: string, sessionUuid: string): Promise<EpisodeRes[]> {
    const categories_query = Array.from(categories).map(category => `category=${category}&`).join("")
    const search_query = search_string ? search_string : ""
    const query = categories_query + "search_string=" + search_query

    return await fetch(`http://localhost:8000/episodes?${query}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Session-Uuid': sessionUuid
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

async function get_podcasts(categories: Set<string>, searchString: string, sessionUuid: string): Promise<PodcastRes[]> {
    let categories_query = ''
    if (!categories) {
        categories_query = Array.from(categories).map(category => `categories=${category}&`).join("")
    }
    let query = categories_query
    if (searchString) {
        query = query + "search_string=" + searchString
    }

    return await fetch(`http://localhost:8000/podcasts?${query}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Session-Uuid': sessionUuid
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}



async function get_albums(genres: Set<string>, searchString: string, sessionUuid: string): Promise<AlbumRes[]> {
    let genres_query = ''
    if (!genres) {
        genres_query = Array.from(genres).map(genre => `genres=${genre}&`).join("")
    }
    let query = genres_query
    if (searchString) {
        query = query + "search_string=" + searchString
    }

    return await fetch(`http://localhost:8000/albums?${query}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Session-Uuid': sessionUuid
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

// QUESTION: kako da go napravime searchot da ne e case sensitive?
async function get_songs(genres: Set<string>, searchString: string, sessionUuid: string): Promise<SongRes[]> {
    let genres_query = ''
    if (!genres) {
        genres_query = Array.from(genres).map(genre => `genres=${genre}&`).join("")
    }
    let query = genres_query
    if (searchString) {
        query = query + "search_string=" + searchString
    }

    return await fetch(`http://localhost:8000/songs?${query}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Session-Uuid': sessionUuid
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

async function get_songs_in_playlist(id: number): Promise<SongRes[]> {

    return fetch(`http://localhost:8000/playlist/${id}`,
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

async function get_playlists(sessionUuid: string): Promise<PlaylistRes[]> {

    return fetch("http://localhost:8000/playlists",
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "session-uuid": sessionUuid
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

}

function upload_song(song: Song) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(song),
    }
    fetch(url, options)
        .then((res) => console.log(res.json()))
        .catch((err) => {
            console.log(err)
        })
}

function upload_episode(episode: Episode) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(episode),
    }
    fetch(url, options)
        .then((res) => console.log(res.json()))
        .catch((err) => {
            console.log(err)
        })
}

function create_playlist(playlist: Playlist) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playlist),
    }
    fetch(url, options)
        .then((res) => console.log(res.json()))
        .catch((err) => {
            console.log(err)
        })
}

function create_album(album: Album) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(album),
    }
    fetch(url, options)
        .then((res) => console.log(res.json()))
        .catch((err) => {
            console.log(err)
        })
}

function create_podcast(podcast: Podcast) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(podcast),
    }
    fetch(url, options)
        .then((res) => console.log(res.json()))
        .catch((err) => {
            console.log(err)
        })
}

function add_song_to_playlist(data: { playlist_id: number, song_id: number }, sessionUuid: string) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "session-uuid": sessionUuid
        },
        body: JSON.stringify(data),
    }
    return fetch("http://localhost:8000/playlists/add", options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}

async function get_genres(sessionUuid: string): Promise<Genre[]> {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "session-uuid": sessionUuid
        }
    }
    return fetch("http://localhost:8000/genres", options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}

async function get_categories(sessionUuid: string): Promise<Category[]> {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "session-uuid": sessionUuid
        }
    }
    return fetch("http://localhost:8000/categories", options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}


export { get_genres, get_songs, get_episodes, get_albums, get_podcasts, get_playlists, create_album, create_playlist, create_podcast, upload_episode, upload_song, add_song_to_playlist, get_categories }
