import { ChangeEvent, useContext, useEffect, useState } from "react"
import { create_podcast, get_categories } from "./api/creation"
import { AuthContext } from "./AuthContext"
import Button from "./Button"
import Header from "./Header"
import InputField from "./inputField"
import SelectField from "./SelectField"


const CreatePodcast = () => {
    const [title, setTitle] = useState("")
    const [categoryOptions, setCategoryOptions] = useState<Category[]>([])
    const [category, setCategory] = useState("rl1")
    const [message, setMessage] = useState<string>("")
    const { sessionUuid, userId } = useContext(AuthContext)

    useEffect(() => {
        if (sessionUuid && userId) {
            get_categories(sessionUuid).then(res => { setCategoryOptions(res); setCategory(res[0].category_name) })

        }
    }, []);


    const handleSubmit = () => {

        const catId = categoryOptions.find(c => c.category_name == category)
        if (userId && catId && sessionUuid) {
            const data: Podcast = {
                podcast_title: title,
                created_by: userId,
                category_id: catId.category_id,
            }
            create_podcast(data, sessionUuid).then(res => {
                setMessage("Podcast created")
            }).catch((res) => {
                setMessage("Something went wrong")
            })

        }

    }

    return (
        <div className="bg-black text-purple-300 min-h-screen  h-fit p-10">
            <Header />
            <h1 className="mt-3 text-white text-bold text-5xl">Create a <span className="text-purple-300"> podcast</span> </h1>
            <div className="w-1/2 flex gap-5 py-5 h-full">
                <div className="h-full">
                    <InputField
                        value={title}
                        className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        name="title"
                        placeholder="title" />
                    <SelectField
                        options={categoryOptions.map(cat => cat.category_name)}
                        value={category}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setCategory(value)}
                    />
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

export default CreatePodcast
