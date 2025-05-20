
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../services/productService";
import StarRating from "../components/StarRating";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppDispatch } from "../hooks/useRedux";
import { addToCart } from "../store/cartSlice";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0", 10);
  const dispatch = useAppDispatch();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  });

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success("Added to cart!");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorDisplay
          message="Failed to load product details. Please check you internet."
          onRetry={() => refetch()}
        />
        <div className="mt-4">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-indigo-600 hover:text-indigo-800 flex items-center mb-6"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="relative pt-[100%]">
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-contain p-8"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          
          <div className="flex items-center mt-2 mb-4">
            <StarRating 
              rating={product.rating.rate} 
              count={product.rating.count} 
              showCount={true} 
            />
          </div>
          
          <div className="text-2xl font-bold text-indigo-600 mb-4">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Category</h3>
            <p className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
              {product.category}
            </p>
          </div>
          
          <Button
            onClick={handleAddToCart}
            className="w-full md:w-auto"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
