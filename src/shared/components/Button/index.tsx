type ButtonProps = {
    variant: "primary" | "outline" | "ghost"
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
    const { variant, className, children, onClick, disabled } = props;
    const variantClasses = {
        primary: "bg-blue-500 text-white",
        outline: "bg-white text-blue-500 border border-blue-500",
        ghost: "bg-transparent text-blue-500",
    }
    const variantClass = variantClasses[variant];
    return (
        <button 
            className={`flex flex-row gap-4 cursor-pointer justify-center items-center px-4 py-2 rounded-md hover:opacity-80 ${variantClass} ${className} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`} 
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;