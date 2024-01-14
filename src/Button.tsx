import { FC } from "react";

type ButtonProps = {
    onClick: () => void,
    label: string,
    type?: "submit" | "button",
    className?: string,
}

const Button: FC<ButtonProps> = (props) => {
    return (
        <button
            className={"p-2 rounded-lg bg-purple-300 w-1/2 hover:bg-purple-400 active:bg-purple-500 transform transition-transform " + props.className}
            type={props.type}
            onClick={props.onClick}>
            {props.label}
        </button>
    )

}

export default Button;
