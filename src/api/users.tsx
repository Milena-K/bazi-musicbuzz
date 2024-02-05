const api_url = process.env.REACT_APP_API_URL_LOCAL
const url = "/"

function login_user(userData: { user_name: string, user_password: string }): Promise<{ session_uuid: "string" }> {

    console.log(JSON.stringify(userData))
    return fetch("http://localhost:8000/login",
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(userData)
        }
    ).then((res) => res.json()).catch((err) => {
        console.log(err)
    })

}

function get_user_info(sessionUuid: string): Promise<Buzzer> {
    return fetch("http://localhost:8000/profile", {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).catch((err) => {
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



export { get_user_info, create_user, upload_episode, upload_song, login_user }
