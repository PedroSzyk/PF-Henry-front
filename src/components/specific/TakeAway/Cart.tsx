"use client"

import type React from "react"
import { useCart } from "@/context/CartContext"
import { Minus, Plus, Trash2 } from "lucide-react"

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart()

  return (
    <div className="bg-white rounded-lg shadow-sm h-full border">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Cart</h2>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-15rem)]">
        <div className="p-4 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-lg border bg-white hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                <p className="text-amber-500 font-bold">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {cartItems.length === 0 && <div className="text-center py-8 text-gray-500">Your cart is empty</div>}
        </div>
      </div>

      <div className="p-4 border-t mt-auto">
        <div className="w-full flex items-center justify-between">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold text-amber-500">${total}</span>
        </div>
      </div>
    </div>
  )
}

export default Cart