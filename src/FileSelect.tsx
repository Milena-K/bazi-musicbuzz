import React, { ChangeEvent } from 'react';
import Panorama from "./assets/panorama-variant.svg";

interface FileSelectProps {
    onChange?: (selectedFile: File | null) => void;
}

const FileSelect: React.FC<FileSelectProps> = ({ onChange }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;

        if (onChange) {
            onChange(selectedFile);
        }
    };

    return (
        <label className='bg-white w-fit h-fit'>
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </label>
    );
};

/*

            <div className="" >
                <img src={Panorama} />
            </div>
*/
export default FileSelect
