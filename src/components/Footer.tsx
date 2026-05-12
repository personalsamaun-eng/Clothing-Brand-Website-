import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-paper py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-display text-4xl font-bold tracking-tighter uppercase mb-6">
              Join the Archive
            </h2>
            <p className="text-paper/60 mb-8 max-w-sm">
              Receive early access to seasonal drops and exclusive archive releases directly to your inbox.
            </p>
            <form className="relative max-w-md group" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full border-b border-paper/20 bg-transparent py-4 text-xs tracking-widest uppercase focus:border-paper focus:outline-none transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:translate-x-2 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Navigate</h3>
            <ul className="space-y-4 text-sm text-paper/60 uppercase tracking-wider">
              <li><Link to="/shop" className="hover:text-paper">Collections</Link></li>
              <li><Link to="/shop" className="hover:text-paper">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-paper">Sale</Link></li>
              <li><Link to="/about" className="hover:text-paper">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Service</h3>
            <ul className="space-y-4 text-sm text-paper/60 uppercase tracking-wider">
              <li><Link to="/" className="hover:text-paper">Shipping</Link></li>
              <li><Link to="/" className="hover:text-paper">Returns</Link></li>
              <li><Link to="/" className="hover:text-paper">Contact</Link></li>
              <li><Link to="/" className="hover:text-paper">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between border-t border-paper/10 pt-8 md:flex-row">
          <p className="text-[10px] text-paper/40 uppercase tracking-widest">
            © 2026 AETHER LTD. ALL RIGHTS RESERVED.
          </p>
          <div className="mt-4 flex space-x-8 md:mt-0">
             <span className="text-[10px] text-paper/40 uppercase tracking-widest cursor-pointer hover:text-paper">Privacy Policy</span>
             <span className="text-[10px] text-paper/40 uppercase tracking-widest cursor-pointer hover:text-paper">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
