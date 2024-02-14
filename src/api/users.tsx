const api_url = process.env.REACT_APP_API_URL_LOCAL
const url = "/"

async function validate_session(sessionUuid: string) {
    const userData = await get_user_info(sessionUuid);
    return userData
}

async function login_user(userData: { user_name: string, user_password: string }): Promise<{ session_uuid: "string" }> {

    return fetch("http://localhost:8000/login",
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(userData)
        }
    ).then((res) => res.json()).catch((err) => {
    })

}

async function get_user_info(sessionUuid: string): Promise<Buzzer> {
    return fetch("http://localhost:8000/profile", {
        headers: {
            'Content-Type': 'application/json',
            'session-uuid': sessionUuid
        }
    }).then(res => res.json()).catch((err) => {
        console.log(err)
    })
}

async function create_user(userData: Buzzer): Promise<{ user_name: string, user_email: string, user_type: string }> {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    }

    return await fetch("http://localhost:8000/buzzers/create", options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        })
}



export { get_user_info, create_user, login_user, validate_session }
