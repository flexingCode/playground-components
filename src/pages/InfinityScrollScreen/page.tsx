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
  const [brandValue, setBrandValue] = useState<string>("");

  useEffect(() => {
    setLocalProducts(products.slice(0, 20));
  }, []);
  const filterProducts = (nameSearch: string, brandSearch: string): Product[] => {
    return products.filter(product => {
      const matchesName = nameSearch.trim() === "" || 
                         product.name.toLowerCase().includes(nameSearch.toLowerCase());
      const matchesBrand = brandSearch.trim() === "" || 
                          product.brand.toLowerCase().includes(brandSearch.toLowerCase());
      
      return matchesName && matchesBrand;
    });
  }

  const filteredProducts = filterProducts(searchValue, brandValue);
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
    const filtered = filterProducts(value, brandValue);
    setLocalProducts(filtered.slice(0, 20));
  };

  const handleBrandChange = (value: string) => {
    setBrandValue(value);
    const filtered = filterProducts(searchValue, value);
    setLocalProducts(filtered.slice(0, 20));
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
      <SearchProductSection 
        searchValue={searchValue} 
        brandValue={brandValue}
        onSearchChange={handleSearch} 
        onBrandChange={handleBrandChange} 
      />
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