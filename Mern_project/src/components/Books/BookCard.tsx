import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  genre: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
  sellerId: string;
  sellerName: string;
}

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
  onToggleWishlist?: (book: Book) => void;
  onViewDetails?: (book: Book) => void;
  isInWishlist?: boolean;
  showSellerInfo?: boolean;
}

export const BookCard = ({ 
  book, 
  onAddToCart, 
  onToggleWishlist, 
  onViewDetails,
  isInWishlist = false,
  showSellerInfo = false 
}: BookCardProps) => {
  const discountPercentage = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  return (
    <Card className="book-card group overflow-hidden">
      <div className="relative">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!book.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="secondary" className="bg-red-500 text-white">
              Out of Stock
            </Badge>
          </div>
        )}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
            {discountPercentage}% OFF
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 p-2 ${
            isInWishlist 
              ? "text-red-500 hover:text-red-600" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => onToggleWishlist?.(book)}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Genre */}
          <Badge variant="outline" className="text-xs">
            {book.genre}
          </Badge>
          
          {/* Title & Author */}
          <div>
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(book.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {book.rating.toFixed(1)} ({book.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary rupee-symbol">
              {book.price.toLocaleString('en-IN')}
            </span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span className="text-sm text-muted-foreground line-through rupee-symbol">
                {book.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Seller Info */}
          {showSellerInfo && (
            <p className="text-xs text-muted-foreground">
              Sold by {book.sellerName}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="flex space-x-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails?.(book)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            className="flex-1 btn-primary"
            onClick={() => onAddToCart?.(book)}
            disabled={!book.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};