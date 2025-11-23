import products from "@/data/products.json";
import InfinityList from "@/shared/components/InfinityList";
import type { Product } from "@/types/products";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import SearchProductSection from "./components/SearchProductSection";

const renderProductSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </div>
  )
}

const InfinityScrollScreen = () => {
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setLocalProducts(products.slice(0, 20));
  }, []);

  const filterProducts = (searchValue: string): Product[] => {
    return products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));
  }

  const filteredProducts = filterProducts(searchValue);
  const hasMore = localProducts.length < filteredProducts.length;

  const handleLoadMore = () => {
    setTimeout(() => {
      if(hasMore) {
        setLocalProducts(filteredProducts.slice(0, localProducts.length + 20));
      }
    }, 3000);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setLocalProducts(products.filter(product => product.name.toLowerCase().includes(value.toLowerCase())));
  };

  const renderProduct = (product: Product) => {
    return (
      <ProductCard
        img={product.image}
        title={product.name}
        price={product.price}
        stock={product.stock}
        category={product.category}
        brand={product.brand}
        sku={product.sku}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchProductSection searchValue={searchValue} onSearchChange={handleSearch} />
      <InfinityList
        items={localProducts}
        renderItem={renderProduct}
        keyExtractor={product => product.id.toString()}
        endReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        columns={4}
        loader={renderProductSkeleton()}
        hasMore={hasMore}
      />
    </div>
  );
};

export default InfinityScrollScreen;