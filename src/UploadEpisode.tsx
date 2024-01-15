import { ChangeEvent, useState } from "react"
import Button from "./Button"
import Header from "./Header"
import InputField from "./inputField"
import SelectField from "./SelectField"


const UploadEpisode = () => {
    const [title, setTitle] = useState("")
    const [podcast, setPodcast] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [epNumber, setEpNumber] = useState("")
    const [file, setFile] = useState("")
    const podcastOptions = ["podcast", "podcast1", "podcast2", "podcast3"]
    const categoryOptions = ["category", "cat1", "cat2", "cat3"]

    // useEffect(() => {
    // const user = getUserData()
    // const rlabel = getRecord()
    //});

    const handleSubmit = () => {
        const userId = 5;
        const podcastId = 5;

        const data: Episode = {
            duration: 0,
            podcastId,
            description,
            title,
            filePath: file,
            number: parseInt(epNumber),
            date: new Date(),
            createdBy: userId,
        }

    }

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <h1 className="mt-3 text-white text-bold text-5xl">Upload an <span className="text-purple-300"> episode</span> </h1>
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
                    <textarea value={description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        placeholder="description" name="" id=""
                        className="p-5 bg-transparent border-purple-300 border-2 placeholder:text-purple-300 rounded-lg mt-2.5 w-full min-h-40 h-full" />
                </div>
                <div className="w-1/2">
                    <SelectField
                        options={podcastOptions}
                        value={podcast}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setPodcast(value)}
                    />
                    <SelectField
                        options={categoryOptions}
                        value={category}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setCategory(value)}
                    />
                    <InputField
                        value={epNumber}
                        className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEpNumber(e.target.value)}
                        type="number"
                        name="episode number"
                        placeholder="episode number" />
                    <div className="flex justify-end mt-3">
                        <Button className="text-black font-semibold" label="done" onClick={() => handleSubmit()} type="submit" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadEpisode
