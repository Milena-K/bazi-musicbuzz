import React from "react"

type InputProps = {
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
    placeholder: string,
    className?: string,
    type?: "date" | "number" | "password" | "email"
}

const InputField = (props: InputProps) => {
    return (
        <input
            type={props.type}
            min="1"
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            placeholder={props.placeholder}
            className={"mt-2.5 bg-purple-300 rounded-lg w-full h-11 p-5 placeholder:text-black " + props.className} />
    )
}

export default InputField
