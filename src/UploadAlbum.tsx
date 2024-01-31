import { ChangeEvent, useState } from "react"
import Button from "./Button"
import Header from "./Header"
import InputField from "./inputField"
import SelectField from "./SelectField"


const UploadAlbum = () => {
    const [title, setTitle] = useState("")
    const [recordLabel, setRecordLabel] = useState("rl1")
    const rlOptions = ["rl1", "rl2", "rl3", "rl4"]

    // useEffect(() => {
    // const user = getUserData()
    // const rlabel = getRecord()
    //});


    const handleSubmit = () => {
        const userId = 5;
        const podcastId = 5;

        const data: Album = {
            title,
            date: new Date(),
            createdBy: userId,
            recordLabelId: rlOptions.indexOf(recordLabel),
        }

    }

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <h1 className="mt-3 text-white text-bold text-5xl">Create an <span className="text-purple-300"> album</span> </h1>
            <div className="w-1/2 flex gap-5 py-5 h-full">
                <div className="h-full">
                    <InputField
                        value={title}
                        className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        name="title"
                        placeholder="title" />
                    <SelectField
                        options={rlOptions}
                        value={recordLabel}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setRecordLabel(recordLabel)}
                    />
                    <div className="flex justify-end mt-3">
                        <Button className="text-black font-semibold" label="done" onClick={() => handleSubmit()} type="submit" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadAlbum
