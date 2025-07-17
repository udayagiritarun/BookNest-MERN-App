import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Store,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  user?: {
    id: string;
    email: string;
    role: 'user' | 'seller' | 'admin';
  } | null;
  cartItemCount?: number;
  onSearch?: (query: string) => void;
  onSignOut?: () => void;
}

export const Navbar = ({ user, cartItemCount = 0, onSearch, onSignOut }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, children, className = "" }: { to: string; children: React.ReactNode; className?: string }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive(to)
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-secondary"
      } ${className}`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <BookOpen className="h-8 w-8 text-primary group-hover:text-primary-glow transition-colors" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gradient">BookNest</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Where Stories Nestle</span>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search books, authors, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 input-field"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/books">Browse Books</NavLink>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <NavLink to="/admin">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Admin
                  </NavLink>
                )}
                {user.role === 'seller' && (
                  <NavLink to="/seller">
                    <Store className="h-4 w-4 inline mr-1" />
                    Seller
                  </NavLink>
                )}
                {user.role === 'user' && (
                  <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-md transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <NavLink to="/profile">
                    <User className="h-4 w-4 inline mr-1" />
                    Profile
                  </NavLink>
                  <Button variant="outline" size="sm" onClick={onSignOut}>
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/login">Sign In</NavLink>
                <Button asChild className="btn-primary">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 input-field"
                />
              </div>
            </form>

            <div className="flex flex-col space-y-2">
              <NavLink to="/books">Browse Books</NavLink>
              
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <NavLink to="/admin">
                      <Shield className="h-4 w-4 inline mr-1" />
                      Admin Dashboard
                    </NavLink>
                  )}
                  {user.role === 'seller' && (
                    <NavLink to="/seller">
                      <Store className="h-4 w-4 inline mr-1" />
                      Seller Dashboard
                    </NavLink>
                  )}
                  {user.role === 'user' && (
                    <NavLink to="/cart">
                      <ShoppingCart className="h-4 w-4 inline mr-1" />
                      Cart ({cartItemCount})
                    </NavLink>
                  )}
                  <NavLink to="/profile">
                    <User className="h-4 w-4 inline mr-1" />
                    Profile
                  </NavLink>
                  <Button variant="outline" size="sm" onClick={onSignOut} className="w-fit">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/login">Sign In</NavLink>
                  <NavLink to="/signup">Sign Up</NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};