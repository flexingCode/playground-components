import type { InputProps } from "../Input";
import Input from "../Input";

type FormControlProps = {
    label: string;
}

const FormControl = (props: FormControlProps & InputProps) => {
    const { label, ...inputProps } = props;
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={inputProps.name} className="text-sm font-medium">{label}</label>
            <Input {...inputProps} />
        </div>
    )
}

export default FormControl;