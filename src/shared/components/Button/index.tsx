type ButtonProps = {
    variant: "primary" | "outline" | "ghost"
    className?: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const Button = (props: ButtonProps) => {
    const { variant, className, children, onClick, disabled, type } = props;
    const variantClasses = {
        primary: "bg-blue-500 text-white",
        outline: "bg-white text-blue-500 border border-blue-500",
        ghost: "bg-transparent text-blue-500",
    }
    const variantClass = variantClasses[variant];
    return (
        <button 
            className={`flex flex-row gap-4 cursor-pointer justify-center items-center px-4 py-2 rounded-md hover:opacity-80 ${variantClass} ${className} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`} 
            onClick={onClick}
            type={type}>
            {children}
        </button>
    )
}

export default Button;