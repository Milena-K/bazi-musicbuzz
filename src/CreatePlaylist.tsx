import { ChangeEvent, useContext, useState } from "react"
import { create_playlist } from "./api/creation"
import { AuthContext } from "./AuthContext"
import Button from "./Button"
import Header from "./Header"
import InputField from "./inputField"
import SelectField from "./SelectField"


const CreatePlaylist = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [message, setMessage] = useState<string>("")
    const categoryOptions = ["cat1", "cat2", "cat3", "cat4"]
    const { sessionUuid } = useContext(AuthContext)


    const handleSubmit = () => {
        console.log(title)
        const data = {
            playlist_name: title,
            playlist_description: desc,
        }
        if (sessionUuid) {
            create_playlist(data, sessionUuid).then((res) => {
                setMessage("Playlist created")
            }).catch((res) => {
                setMessage("Something went wrong")
            })
        }
    }

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <h1 className="mt-3 text-white text-bold text-5xl">Create a <span className="text-purple-300"> playlist</span> </h1>
            <div className="w-1/2 flex gap-5 py-5 h-full">
                <div className="h-full">
                    <InputField
                        value={title}
                        className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        name="title"
                        placeholder="title" />
                    <InputField
                        value={desc}
                        className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
                        name="desc"
                        placeholder="description" />
                    <div className="flex justify-end mt-3">
                        <Button className="text-black font-semibold" label="done" onClick={() => handleSubmit()} type="submit" />
                    </div>
                    <p className="text-violet-300">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CreatePlaylist
