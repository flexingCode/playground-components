import type { SelectProps } from "../Select";
import Select from "../Select";

type FormControlSelectProps = SelectProps & {
    label: string;
}

const FormControlSelect = (props: FormControlSelectProps) => {
    const { label, ...selectProps } = props;
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={selectProps.name} className="text-sm font-medium">{label}</label>
            <Select {...selectProps} />
        </div>
    )
}

export default FormControlSelect;