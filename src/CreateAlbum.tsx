import { ChangeEvent, useContext, useEffect, useState } from "react"
import { create_album, get_record_labels } from "./api/creation"
import { AuthContext } from "./AuthContext"
import Button from "./Button"
import Header from "./Header"
import InputField from "./inputField"
import SelectField from "./SelectField"


const CreateAlbum = () => {
    const [title, setTitle] = useState("")
    const [rlOptions, setRLOptions] = useState<RecordLabel[]>([])
    const [recordLabel, setRecordLabel] = useState<string>()
    const [message, setMessage] = useState<string>("")
    const { sessionUuid, userId } = useContext(AuthContext)

    useEffect(() => {
        if (sessionUuid) {
            get_record_labels(sessionUuid).then((res) => { setRLOptions(res); if (res.at(0)) setRecordLabel(res[0].rlabel_name) })
        }
    }, []);

    const handleSubmit = () => {
        const podcastId = 5;

        if (sessionUuid && userId) {
            const rl_id = rlOptions.filter(op => op.rlabel_name == recordLabel)[0].rlabel_id

            const data: Album = {
                album_title: title,
                al_created_by: userId,
                rlabel_id: rl_id,
            }

            create_album(data, sessionUuid).then(res => {
                setMessage("Album created")
            }).catch((res) => {
                setMessage("Something went wrong")
            })
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
                        options={rlOptions.map(op => op.rlabel_name)}
                        value={recordLabel}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setRecordLabel(value)}
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

export default CreateAlbum
