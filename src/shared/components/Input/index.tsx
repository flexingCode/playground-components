type InputProps = {
    value: string;
    onTextChange: (text: string) => void;
    placeholder: string;
    type: "text" | "number" | "email" | "password";
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

const Input = (props: InputProps) => {
    const { value, onTextChange, placeholder, type, className, icon, iconPosition } = props;
    return (
        <div className={`w-full rounded-md border border-gray-300 flex items-center gap-2 px-4 ${className}`}>
            {icon && iconPosition === "left" && icon}
            <input
                className="w-full p-2 focus:outline-none focus:ring-0"
                type={type}
                value={value}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder={placeholder}
            />
            {icon && iconPosition === "right" && icon}
        </div >
    )
}

export default Input;