import type { InputProps } from "../Input";

export type SelectProps = Omit<InputProps, "type"> & {
    options: Option[];
}

type Option = {
    label: string;
    value: string;
}

const Select = (props: SelectProps) => {
    const { options, ...inputProps } = props;
    return (
        <select {...inputProps}
            onChange={(e) => inputProps.onTextChange?.(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md">
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>

    )
}

export default Select;