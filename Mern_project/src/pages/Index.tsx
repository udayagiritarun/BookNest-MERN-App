import { useState } from "react";
import { Search, BookOpen, Star, Users, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { BookCard, Book } from "@/components/Books/BookCard";

// Mock data for demonstration
const featuredBooks: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 450,
    originalPrice: 650,
    genre: "Fiction",
    rating: 4.5,
    reviewCount: 1250,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description: "A novel about all the choices that go into a life well lived.",
    inStock: true,
    sellerId: "seller1",
    sellerName: "Bookworm Store"
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    price: 520,
    originalPrice: 699,
    genre: "Self-Help",
    rating: 4.8,
    reviewCount: 2100,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    description: "Tiny changes, remarkable results.",
    inStock: true,
    sellerId: "seller2",
    sellerName: "Wisdom Books"
  },
  {
    id: "3",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 380,
    genre: "Thriller",
    rating: 4.3,
    reviewCount: 890,
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    description: "A psychological thriller about a woman who refuses to speak.",
    inStock: true,
    sellerId: "seller1",
    sellerName: "Bookworm Store"
  },
  {
    id: "4",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 580,
    originalPrice: 750,
    genre: "History",
    rating: 4.6,
    reviewCount: 3200,
    imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop",
    description: "A brief history of humankind.",
    inStock: true,
    sellerId: "seller3",
    sellerName: "History Hub"
  }
];

const categories = [
  { name: "Fiction", icon: "📚", count: "2,500+ books" },
  { name: "Non-Fiction", icon: "🎓", count: "1,800+ books" },
  { name: "Romance", icon: "💕", count: "1,200+ books" },
  { name: "Mystery", icon: "🔍", count: "980+ books" },
  { name: "Science", icon: "🔬", count: "750+ books" },
  { name: "Biography", icon: "👤", count: "600+ books" }
];

const stats = [
  { icon: BookOpen, label: "Books Available", value: "50,000+" },
  { icon: Users, label: "Happy Readers", value: "25,000+" },
  { icon: Star, label: "Average Rating", value: "4.8" },
  { icon: ShoppingBag, label: "Orders Delivered", value: "100,000+" }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user] = useState(null); // This would come from your auth context

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Redirect to books page with search query
    window.location.href = `/books?search=${encodeURIComponent(query)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar user={user} onSearch={handleSearch} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="h-12 w-12 text-gold-accent animate-float" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-gold-accent">BookNest</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Where Stories Nestle in Your Heart
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-primary-foreground/80">
              Discover thousands of books from local sellers across India. 
              From bestsellers to hidden gems, find your next great read at the best prices.
            </p>
            
            {/* Hero Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for books, authors, or genres..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 py-3 text-lg bg-background text-foreground"
                  />
                </div>
                <Button type="submit" size="lg" className="btn-accent px-8">
                  Search
                </Button>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary">
                Browse All Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Join as Seller
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-lg text-muted-foreground">
              Find your favorite genres and discover new ones
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="book-card text-center cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Books</h2>
              <p className="text-lg text-muted-foreground">
                Handpicked recommendations just for you
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex">
              View All Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onAddToCart={(book) => console.log('Add to cart:', book)}
                onToggleWishlist={(book) => console.log('Toggle wishlist:', book)}
                onViewDetails={(book) => console.log('View details:', book)}
                showSellerInfo={true}
              />
            ))}
          </div>
          
          <div className="text-center mt-8 md:hidden">
            <Button variant="outline">
              View All Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of book lovers who have found their next favorite story on BookNest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-accent">
              Create Free Account
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Browse Without Account
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-gradient">BookNest</span>
              </div>
              <p className="text-muted-foreground">
                India's largest online bookstore connecting readers with local sellers.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Readers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/books" className="hover:text-primary">Browse Books</a></li>
                <li><a href="/wishlist" className="hover:text-primary">My Wishlist</a></li>
                <li><a href="/orders" className="hover:text-primary">Order History</a></li>
                <li><a href="/reviews" className="hover:text-primary">My Reviews</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Sellers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/seller/signup" className="hover:text-primary">Start Selling</a></li>
                <li><a href="/seller/dashboard" className="hover:text-primary">Seller Dashboard</a></li>
                <li><a href="/seller/help" className="hover:text-primary">Seller Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/help" className="hover:text-primary">Help Center</a></li>
                <li><a href="/contact" className="hover:text-primary">Contact Us</a></li>
                <li><a href="/shipping" className="hover:text-primary">Shipping Info</a></li>
                <li><a href="/returns" className="hover:text-primary">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BookNest. Made with ❤️ for book lovers across India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
