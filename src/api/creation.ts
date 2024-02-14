const url = ""

async function get_episodes(categories: Set<string>, search_string: string, sessionUuid: string): Promise<EpisodeRes[]> {
    const categories_query = Array.from(categories).map(category => `category=${category}&`).join("")
    const search_query = search_string ? search_string : ""
    const query = categories_query + "search_string=" + search_query

    return fetch(`http://localhost:8000/episodes?${query}`,
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
    if (genres) {
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
    if (genres) {
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

async function get_podcasts_profile(sessionUuid: string): Promise<PodcastRes[]> {

    return fetch("http://localhost:8000/profile/podcasts",
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

async function get_albums_profile(sessionUuid: string): Promise<AlbumRes[]> {

    return fetch("http://localhost:8000/profile/albums",
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

async function get_playlists(sessionUuid: string): Promise<PlaylistRes[]> {

    return fetch("http://localhost:8000/profile/playlists",
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

async function upload_song(song: SongRes, sessionUuid: string): Promise<SongRes> {
    console.log(song)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "session-uuid": sessionUuid
        },
        body: JSON.stringify(song),
    }
    return fetch("http://localhost:8000/songs/create", options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}

async function upload_episode(episode: EpisodeRes, sessionUuid: string): Promise<EpisodeRes> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "session-uuid": sessionUuid
        },
        body: JSON.stringify(episode),
    }
    return fetch("http://localhost:8000/episodes/create", options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}


async function create_album(album: Album, sessionUuid: string): Promise<AlbumRes> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "session-uuid": sessionUuid
        },
        body: JSON.stringify(album),
    }
    return fetch("http://localhost:8000/albums/create", options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}

async function create_podcast(podcast: Podcast, sessionUuid: string): Promise<Podcast> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "session-uuid": sessionUuid
        },
        body: JSON.stringify(podcast),
    }
    return fetch("http://localhost:8000/podcasts/create", options)
        .then((res) => res.json())
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

async function get_playlist_by_id(id: number): Promise<Playlist> {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }
    return fetch(`http://localhost:8000/playlists?playlist_id=${id}`, options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}

async function create_playlist(data: { playlist_name: string, playlist_description: string }, sessionUuid: string): Promise<PlaylistRes> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Session-Uuid": sessionUuid
        },
        body: JSON.stringify(data),
    }
    return fetch("http://localhost:8000/playlists/create", options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}

async function get_genres(sessionUuid: string) {
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

async function get_record_labels(sessionUuid: string): Promise<RecordLabel[]> {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "session-uuid": sessionUuid
        }
    }
    return fetch("http://localhost:8000/labels", options)
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


export { get_genres, get_playlist_by_id, get_record_labels, get_songs, get_episodes, get_podcasts_profile, get_albums_profile, get_albums, get_podcasts, get_playlists, create_album, create_playlist, create_podcast, upload_episode, upload_song, add_song_to_playlist, get_categories }
