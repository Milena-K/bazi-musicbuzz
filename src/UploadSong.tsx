import { ChangeEvent, useState } from "react"
import Button from "./Button"
import Header from "./Header"
import InputField from "./inputField"
import SelectField from "./SelectField"


const UploadSong = () => {
    const [title, setTitle] = useState("")
    const [file, setFile] = useState("")
    const [album, setAlbum] = useState("")
    const [genre, setGenre] = useState("")
    const [recordLabel, setRecordLabel] = useState("")
    const albumOptions = ["album", "album1", "album2", "album3"]
    const genreOptions = ["genre", "genre1", "genre2", "genre3"]
    const recordLabelOptions = ["record label", "rl1", "rl2", "rl3"]

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
            <h1 className="mt-3 text-white text-bold text-5xl">Upload a <span className="text-purple-300"> song</span> </h1>
            <div className="w-1/2 flex gap-5 py-5 h-full">
                <div className="h-full">
                    <InputField
                        value={title}
                        className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        name="title"
                        placeholder="title" />
                    <InputField
                        value={file}
                        className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.value)}
                        name="file"
                        placeholder="file" />
                    <textarea placeholder="lyrics" name="" id="" className="p-5 bg-transparent border-purple-300 border-2 placeholder:text-purple-300 rounded-lg mt-2.5 w-full min-h-40 h-full" />
                </div>
                <div className="w-1/2">
                    <SelectField
                        options={albumOptions}
                        value={album}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setAlbum(value)}
                    />
                    <SelectField
                        options={genreOptions}
                        value={genre}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setGenre(value)}
                    />
                    <SelectField
                        options={recordLabelOptions}
                        value={recordLabel}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setRecordLabel(value)}
                    />
                    <div className="flex justify-end mt-3">
                        <Button className="text-black font-semibold" label="done" onClick={() => handleSubmit()} type="submit" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadSong
