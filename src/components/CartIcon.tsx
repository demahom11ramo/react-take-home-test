
import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { toggleCart } from "../store/cartSlice";
import { Button } from "@/components/ui/button";

const CartIcon: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <Button 
      variant="ghost" 
      onClick={() => dispatch(toggleCart())}
      className="relative"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  );
};

export default CartIcon;
