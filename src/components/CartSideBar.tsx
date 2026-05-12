import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "../App";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export function CartSideBar() {
  const { cart, isOpen, setIsOpen, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-paper shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-ink/5 p-8">
              <h2 className="text-xl font-bold uppercase tracking-tighter">Your Registry ({cart.length})</h2>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-6 text-center">
                  <div className="h-12 w-12 rounded-full border border-ink/10 flex items-center justify-center opacity-20">
                     <Trash2 className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40 italic">
                    Your archive is currently empty.
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => setIsOpen(false)}
                    className="border-b-2 border-ink pb-1 text-[10px] font-bold uppercase tracking-widest hover:opacity-50"
                  >
                    Start Browsing
                  </Link>
                </div>
              ) : (
                <div className="space-y-12 py-8">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="group flex gap-6">
                      <div className="relative h-32 w-24 shrink-0 overflow-hidden bg-canvas">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-tight">{item.name}</h3>
                            <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-ink/40 italic">
                              Size: {item.selectedSize}
                            </p>
                          </div>
                          <p className="text-xs font-bold tracking-tight">${item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center space-x-4 border border-ink/10 px-3 py-1">
                              <span className="text-[10px] font-bold opacity-40">{item.quantity} units</span>
                           </div>
                           <button
                             onClick={() => removeFromCart(item.id, item.selectedSize)}
                             className="text-[10px] font-bold uppercase tracking-widest text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                           >
                             Remove
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-ink/5 p-8 space-y-6 bg-canvas/30">
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-ink/40">
                      <span>Subtotal</span>
                      <span>${cartTotal}</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-ink/40">
                      <span>Shipping</span>
                      <span className="italic">Calculated at next step</span>
                   </div>
                   <div className="flex justify-between pt-4 text-xl font-bold uppercase tracking-tighter">
                      <span>Total Value</span>
                      <span>${cartTotal}</span>
                   </div>
                </div>
                
                <button className="flex w-full items-center justify-center space-x-4 bg-ink py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-paper hover:bg-ink/90 transition-all">
                  <span>Secure Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                
                <p className="text-center text-[8px] font-medium uppercase tracking-[0.2em] text-ink/30 italic">
                  Registry holds items for 15 minutes only.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
