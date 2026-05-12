import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../App";
import { cn } from "../lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, setIsOpen } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-paper/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/" className="group flex items-center space-x-2">
          <div className="h-2 w-2 bg-ink" />
          <span className="font-display text-2xl font-bold tracking-tighter uppercase">Aether</span>
        </Link>

        <nav className="hidden space-x-12 md:flex">
          <Link to="/shop" className="text-xs font-medium uppercase tracking-widest hover:opacity-50">
            Collections
          </Link>
          <Link to="/lookbook" className="text-xs font-medium uppercase tracking-widest hover:opacity-50">
            Lookbook
          </Link>
          <Link to="/about" className="text-xs font-medium uppercase tracking-widest hover:opacity-50">
            Archive
          </Link>
        </nav>

        <div className="flex items-center space-x-6">
          <button className="hover:opacity-50">
            <Search className="h-5 w-5" />
          </button>
          <button onClick={() => setIsOpen(true)} className="relative group flex items-center">
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[8px] font-bold text-paper"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button className="md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
