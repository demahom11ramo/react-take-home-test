
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/product";
import StarRating from "./StarRating";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <div className="relative pt-[100%] bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 object-contain w-full h-full p-4"
            loading="lazy"
          />
        </div>
        <CardContent className="flex-grow p-4">
          <h3 className="text-sm font-medium line-clamp-2 mb-2.5">{product.title}</h3>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>
            <StarRating rating={product.rating.rate} />
          </div>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0">
          <p className="line-clamp-2 text-xs text-gray-400 capitalize">
            {product.description}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
