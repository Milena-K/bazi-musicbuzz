import { ChangeEvent, useState } from "react";import { create_user } from "./api/users";import Button from "./Button";import FileSelect from "./FileSelect";import InputField from "./inputField";import RegisterJPG from "./register.jpg";import ArrowListener from "./assets/arrow_listener.svg";import SelectField from "./SelectField";const Register = () => {    const [username, setUsername] = useState("")    const [pass, setPass] = useState("")    const [email, setEmail] = useState("")    const [info, setInfo] = useState("")    const [country, setCountry] = useState("")    const [picture, setPicture] = useState("")    const [isArtist, setIsArtist] = useState(true)    const countries = ['country', 'Option 1', 'Option 2', 'Option 3']    const handleSelectChange = (value: string) => setCountry(value)    const handleFileChange = (selectedFile: File | null) => {        if (selectedFile) {            console.log('Selected file:', selectedFile.name);        } else {            console.log('No file selected');        }    };    const handleSubmit = () => {        if (isArtist) {            const data: Artist = {                username,                password: pass,                email,                information: info,                country,                image: picture,            }            create_user(data)        } else {            const data: Listener = {                username,                password: pass,                email,                country,                image: picture,            }            create_user(data)        }    }    const handleIsArtist = () => {        setIsArtist(!isArtist)    }    return (        <div className="w-full h-screen flex items-center justify-center relative" id="background">            <img className="h-full" src={RegisterJPG} alt="hand of a DJ on a disk" />            <div id="black-box" className="h-screen w-1/4 bg-black absolute flex justify-center items-center">                <div className="text-white w-3/4">                    <h3 className="text-2xl mb-3 ">                        register as                        {                            isArtist ? (                                <span className="mx-1.5">an <span className="text-violet-300"> artist</span></span>                            ) :                                (                                    <span className="mx-1.5">a <span className="text-violet-300"> listener</span></span>                                )                        }                    </h3>                    <div className="text-black">                        <InputField                            value={username}                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}                            name="username"                            placeholder="username" />                        <InputField                            type="password"                            value={pass}                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}                            name="password"                            placeholder="password" />                        <InputField                            type="email"                            value={email}                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}                            name="email"                            placeholder="e-mail" />                        <SelectField                            options={countries}                            value={country}                            onChange={handleSelectChange}                        />                        {                            isArtist ? (                                <InputField                                    value={info}                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInfo(e.target.value)}                                    name="other info"                                    placeholder="other info" />                            ) : null                        }                        <FileSelect                            onChange={handleFileChange}                        />                        <InputField                            value={picture}                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPicture(e.target.value)}                            name="picture"                            placeholder="picture file path" />                        <div className="flex mt-2.5 justify-end">                            <Button type="submit" label="continue" onClick={handleSubmit} />                        </div>                        <div className="text-white mt-10 w-fit">                            <div className="pl-4 flex justify-end">                                register as a                                <button onClick={() => handleIsArtist()}>                                    {                                        isArtist ? (                                            <span className="text-violet-300 pl-1.5">listener</span>                                        ) : (                                            <span className="text-violet-300 pl-1.5">artist</span>                                        )                                    }                                </button>                            </div>                            <img className="h-full" src={ArrowListener} alt="arrow to the left" />                        </div>                    </div>                </div>            </div>        </div>    )}export default Register;