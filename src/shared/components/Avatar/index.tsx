type AvatarProps = {
    name: string;
    className?: string;
}

const Avatar = (props: AvatarProps) => {
    const { name, className } = props;
    return (
        <div className={`bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full ${className}`}>
            {name.charAt(0)}
        </div>
    )
}

export default Avatar;