type PaginationItemProps = {
    page: number;
    isActive: boolean;
    onClick: () => void;
}

const PaginationItem = (props: PaginationItemProps) => {
    const { page, isActive, onClick } = props;
    return (
        <button

            className={`w-8 h-8 cursor-pointer rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} transition-all duration-300`}
            onClick={onClick}
            disabled={isActive}
        >
            {page}
        </button>
    )
}

export default PaginationItem;