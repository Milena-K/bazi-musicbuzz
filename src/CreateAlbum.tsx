import { ChangeEvent, useState } from "react"
import Button from "./Button"
import Header from "./Header"
import InputField from "./inputField"
import SelectField from "./SelectField"


const CreateAlbum = () => {
    const [title, setTitle] = useState("")
    const [file, setFile] = useState("")

    // useEffect(() => {
    // const user = getUserData()
    // const rlabel = getRecord()
    //});

    const handleSubmit = () => {
        const userId = 5;
        const rlId = 5;

        const data: Album = {
            title,
            date: new Date(),
            createdBy: userId,
            recordLabelId: rlId
        }

    }

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <h1 className="mt-3 text-white text-bold text-5xl">Upload an <span className="text-purple-300"> album</span> </h1>
            <div className="w-1/2 flex gap-5 py-5 h-full">
                <div className="h-full">
                </div>
                <div className="w-1/2">
                </div>
            </div>
        </div>
    )
}

export default CreateAlbum
