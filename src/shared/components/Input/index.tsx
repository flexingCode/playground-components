export type InputProps = {
    name?: string;
    value: string;
    onTextChange: (text: string) => void;
    placeholder: string;
    type: "text" | "number" | "email" | "password";
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    error?: string;
}

const Input = (props: InputProps) => {
    const { name, value, onTextChange, placeholder, type, className, icon, iconPosition, error } = props;
    const hasError = !!error;
    
    return (
        <div className="w-full">
            <div className={`w-full rounded-md border flex items-center gap-2 px-4 ${
                hasError 
                    ? "border-red-500 focus-within:border-red-600" 
                    : "border-gray-300 focus-within:border-blue-500"
            } ${className}`}>
                {icon && iconPosition === "left" && icon}
                <input
                    name={name}
                    className="w-full p-2 focus:outline-none focus:ring-0"
                    type={type}
                    value={value}
                    onChange={(e) => onTextChange(e.target.value)}
                    placeholder={placeholder}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${name}-error` : undefined}
                />
                {icon && iconPosition === "right" && icon}
            </div>
            {error && (
                <p 
                    id={hasError ? `${name}-error` : undefined}
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    )
}

export default Input;