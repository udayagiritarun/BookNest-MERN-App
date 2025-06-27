import { useState, useEffect } from 'react'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books')
      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }
      const data = await response.json()
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading books...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="app">
      <header className="header">
        <h1>BookNest: Where Stories Nestle</h1>
        <p>Discover your next favorite book</p>
      </header>
      
      <main className="main">
        <div className="books-grid">
          {books.length === 0 ? (
            <p>No books available</p>
          ) : (
            books.map((book) => (
              <div key={book._id} className="book-card">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="book-cover"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg'
                  }}
                />
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <p className="book-genre">{book.genre}</p>
                  <p className="book-price">${book.price}</p>
                  <div className="book-rating">
                    <span>⭐ {book.rating} ({book.numReviews} reviews)</span>
                  </div>
                  <p className="book-stock">
                    {book.stockCount > 0 ? `${book.stockCount} in stock` : 'Out of stock'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default App


