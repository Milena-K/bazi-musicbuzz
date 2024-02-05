

const url = "some/url/users" // TODO: create env vars

function login_user(userData: { username: string, password: string, isArtist: boolean }): Promise<Array<Buzzer>> {
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}

function fetch_users(): Promise<Array<Buzzer>> {
    return fetch(url)
        .then(res => res.json())
        .catch((err) => {
            console.log(err)
        })
}

function create_user(userData: Buzzer) {
    //TODO: change the request url based on the type of Buzzer (Listener or Artist)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
    }
    fetch(url, options)
        .then((res) => console.log(res.json()))
        .catch((err) => {
            console.log(err)
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



export { fetch_users, create_user, upload_episode, upload_song, login_user }
