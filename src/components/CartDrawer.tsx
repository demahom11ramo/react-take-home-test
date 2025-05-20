
import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { removeFromCart, updateQuantity, clearCart, toggleCart } from "../store/cartSlice";

const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector(state => state.cart);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30" 
        onClick={() => dispatch(toggleCart())}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button 
            onClick={() => dispatch(toggleCart())}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <ul className="divide-y">
              {items.map(item => (
                <li key={item.id} className="py-4 flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                    <p className="text-indigo-600 font-semibold">${item.price.toFixed(2)}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="px-2 py-1"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="px-2 py-1"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => dispatch(clearCart())}
                className="py-2 px-4 border border-gray-300 rounded hover:bg-gray-50"
              >
                Clear Cart
              </button>
              <button
                className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
