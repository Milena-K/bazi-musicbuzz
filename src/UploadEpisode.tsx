import { ChangeEvent, useContext, useEffect, useState } from "react"
import { create_podcast, get_categories, get_podcasts_profile, upload_episode } from "./api/creation"
import { AuthContext } from "./AuthContext"
import Button from "./Button"
import Header from "./Header"
import InputField from "./inputField"
import SelectField from "./SelectField"


const UploadEpisode = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState<number>()
    const [epNumber, setEpNumber] = useState("")
    const [file, setFile] = useState("")
    const [podcastOptions, setPodcastOptions] = useState<PodcastRes[]>([])
    const [podcast, setPodcast] = useState("")
    const [categoryOptions, setCategoryOptions] = useState<Category[]>([])
    const [category, setCategory] = useState("")
    const [message, setMessage] = useState<string>("")
    const { sessionUuid, userId } = useContext(AuthContext)

    useEffect(() => {
        if (sessionUuid) {
            get_categories(sessionUuid).then(res => { setCategoryOptions(res); if (res.at(0)) setCategory(res[0]?.category_name) }).catch(err => console.log())
            get_podcasts_profile(sessionUuid).then(res => { setPodcastOptions(res); if (res.at(0)) setPodcast(res[0]?.podcast_title) }).catch(err => console.log())
        }
    }, []);

    const handleSubmit = () => {
        const podcastId = podcastOptions.find(p => p.podcast_title == podcast);

        if (podcastId?.podcast_id && sessionUuid && duration) {
            console.log(duration)
            const data: EpisodeRes = {
                episode_duration: duration,
                podcast_id: podcastId.podcast_id,
                episode_description: description,
                episode_title: title,
                episode_file: file,
                episode_number: parseInt(epNumber),
            }
            upload_episode(data, sessionUuid).then(res => {
                setMessage("Episode created")
            }).catch((res) => {
                setMessage("Something went wrong")
            })
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
                        value={duration}
                        className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDuration(+e.target.value)}
                        type="number"
                        name="duration"
                        placeholder="duration" />
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
                        options={podcastOptions.map(p => p.podcast_title)}
                        value={podcast}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setPodcast(value)}
                    />
                    <SelectField
                        options={categoryOptions.map(c => c.category_name)}
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
                    <p className="text-violet-300">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UploadEpisode
