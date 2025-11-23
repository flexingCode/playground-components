import formatMoney from "@/utils/moneyUtils";

type ProductCardProps = {
    img: string;
    title: string;
    price: number;
    stock: number;
    category: string;
    brand: string;
    sku: string;
};

const ProductCard = (props: ProductCardProps) => {
    const { img, title, price, stock, category, brand, sku } = props;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={img} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <div>
                    <h3 className="text-lg font-bold truncate line-clamp-1">{title}</h3>
                    <p className="text-gray-600">{brand}</p>
                </div>
                <div className="flex justify-end mt-4">
                    <h3 className="text-2xl font-bold text-blue-500">
                        {formatMoney(price)}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;