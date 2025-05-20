
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../services/productService";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import CategoryFilter from "../components/CategoryFilter";
import { toast } from "sonner";

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch products
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Fetch categories
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Show toast on error
  useEffect(() => {
    if (productsError) {
      toast.error("Failed to load products");
    }
    if (categoriesError) {
      toast.error("Failed to load categories");
    }
  }, [productsError, categoriesError]);

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products?.filter((product) => product.category === selectedCategory)
    : products;

  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  if (productsLoading) {
    return <LoadingSpinner />;
  }

  if (productsError) {
    return (
      <ErrorDisplay
        message="Failed to load products. Please check your internet."
        onRetry={refetchProducts}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Category filters */}
      {!categoriesLoading && categories && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Show message when no products match filter */}
      {filteredProducts?.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
