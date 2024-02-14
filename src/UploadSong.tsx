import { ChangeEvent, useContext, useEffect, useState } from "react"
import { get_albums, get_albums_profile, get_genres, get_record_labels, upload_song } from "./api/creation"
import { AuthContext } from "./AuthContext"
import Button from "./Button"
import Header from "./Header"
import InputField from "./inputField"
import SelectField from "./SelectField"


const UploadSong = () => {
    const [title, setTitle] = useState("")
    const [duration, setDuration] = useState(0)
    const [file, setFile] = useState("")
    const [message, setMessage] = useState<string>("")
    const [lyrics, setLyrics] = useState("")
    const [album, setAlbum] = useState<string>("")
    const [genres, setGenres] = useState<string[]>([])
    const [recordLabel, setRecordLabel] = useState<string>("nothing")
    const [albumOptions, setAlbumOptions] = useState<AlbumRes[]>([])
    const [genreOptions, setGenreOptions] = useState<string[]>([])
    const [rlOptions, setRLOptions] = useState<RecordLabel[]>([])
    const { sessionUuid } = useContext(AuthContext)

    const handleCheckboxChange = (item: string) => {
        setGenres((genres) => {
            if (genres.includes(item)) {
                return genres.filter((i) => i !== item);
            } else {
                return [...genres, item];
            }
        });
    };

    useEffect(() => {
        if (sessionUuid) {
            get_genres(sessionUuid).then((res) => setGenreOptions(res))
            get_albums_profile(sessionUuid).then((res) => { setAlbumOptions(res); if (res.at(0)) setAlbum(res[0].album_title) })
            get_record_labels(sessionUuid).then((res) => { setRLOptions(res); if (res.at(0)) setRecordLabel(res[0].rlabel_name) })
        }
    }, []);

    const handleSubmit = () => {

        const albumOp = albumOptions.find(al => al.album_title == album)
        const rlabelOp = rlOptions.find(rl => rl.rlabel_name == recordLabel)

        if (albumOp && rlabelOp && sessionUuid && albumOp) {
            const data: SongRes = {
                album_id: albumOp.album_id,
                rlabel_id: rlabelOp?.rlabel_id,
                lyrics: lyrics,
                song_title: title,
                song_file: file,
                song_duration: duration,
                song_date: new Date().toISOString().slice(0, 10),
                genres: genres
            }
            upload_song(data, sessionUuid).then(res => {
                setMessage("Song created")
            }).catch((res) => {
                setMessage("Something went wrong")
            })
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
                    <label>
                        <InputField
                            value={duration}
                            type={"number"}
                            className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDuration(Number(e.target.value))}
                            name="duration"
                            placeholder="duration" />
                        duration
                    </label>
                    <InputField
                        value={file}
                        className="bg-transparent border-purple-300 border-2 placeholder:text-purple-300"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.value)}
                        name="file"
                        placeholder="file" />
                    <textarea value={lyrics} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setLyrics(e.target.value)} placeholder="lyrics" name="" id="" className="p-5 bg-transparent border-purple-300 border-2 placeholder:text-purple-300 rounded-lg mt-2.5 w-full min-h-40 h-full" />
                </div>
                <div className="w-1/2">
                    <SelectField
                        options={albumOptions.map(op => op.album_title)}
                        value={album}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setAlbum(value)}
                    />


                    <SelectField
                        options={rlOptions.map(op => op.rlabel_name)}
                        value={recordLabel}
                        className="bg-transparent border-purple-300 border-2 text-purple-300 "
                        onChange={(value) => setRecordLabel(value)}
                    />

                    <div className="rounded-md border-2 mt-2.5 p-2 border-purple-300">
                        Select Genres
                        <ul className="text-white">
                            {genreOptions.map((item) => (
                                <li key={item}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={genres.includes(item)}
                                            onChange={() => handleCheckboxChange(item)}
                                        />
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-end mt-3">
                        <Button className="text-black font-semibold" label="done" onClick={() => handleSubmit()} type="submit" />
                    </div>
                    <p className="text-violet-300">
                        {message}
                    </p>
                </div>
            </div>
        </div >
    )
}

export default UploadSong
