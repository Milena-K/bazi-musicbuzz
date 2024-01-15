import React, { ChangeEvent } from 'react';

interface SelectProps {
    options: string[];
    value?: string;
    onChange?: (selectedValue: string) => void;
    className?: string
}

const SelectField: React.FC<SelectProps> = ({ options, value, onChange, className }) => {
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <select className={"bg-purple-300 rounded-lg w-full h-11 placeholder:text-black mt-2.5 pl-4 " + className} value={value} onChange={handleSelectChange}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default SelectField
