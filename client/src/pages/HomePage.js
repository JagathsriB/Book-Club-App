import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // This logic dynamically changes the main buttons based on login status
  const actionButtons = isAuthenticated ? (
    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <Link to="/my-collection" className="btn btn-primary btn-lg px-4 gap-3">Go to My Collection</Link>
      <Link to="/community" className="btn btn-outline-secondary btn-lg px-4">Browse Community</Link>
    </div>
  ) : (
    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <Link to="/register" className="btn btn-primary btn-lg px-4 gap-3">Sign Up</Link>
      <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">Login</Link>
    </div>
  );

  return (
    <div>
      <div className="container text-center mt-2 mb-4">
        <h1 className="display-4 fw-bold text-primary">The Book Club</h1>
        <p className="p-2 bg-warning fst-italic lead">A place where pages connect people</p>
      </div>

      <Carousel>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop"
            alt="A collection of books on shelves"
            style={{ height: '500px', objectFit: 'cover', borderRadius: '0.5rem' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
            <h4>Explore Fictional Worlds</h4>
            <p>Escape the ordinary and step into unforgettable stories.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&auto=format&fit=crop"
            alt="A person reading a book in a library"
            style={{ height: '500px', objectFit: 'cover', borderRadius: '0.5rem' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
            <h4>Honest Reviews, Real Readers</h4>
            <p>No fluff, just thoughtful insights from a passionate community.</p>
          </Carousel.Caption>
        </Carousel.Item>
         <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop"
            alt="An open book with a cup of coffee"
            style={{ height: '500px', objectFit: 'cover', borderRadius: '0.5rem' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
            <h4>Find Your Next Favorite Read</h4>
            <p>From timeless classics to contemporary gems, your next adventure awaits.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* NEW: Informational Cards Section */}
      <div className="container mt-5">
        <div className="row align-items-stretch g-4">
          {/* Card 1 */}
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow-lg rounded border-0">
              <div className="card-header bg-light">
                <h2 className="h4 fw-semibold text-dark">Dive Into Fictional Worlds</h2>
              </div>
              <div className="card-body text-center">
                <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500" height="250" width="250" alt="Fiction" className="mb-2 rounded-circle" style={{objectFit: 'cover'}} />
                <p className="text-muted">Escape the ordinary and step into unforgettable stories.</p>
                <button className="btn btn-outline-primary btn-sm">Learn More</button>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow-lg rounded border-0">
              <div className="card-header bg-light">
                <h2 className="h4 fw-semibold text-dark">Honest Reviews, Real Readers</h2>
              </div>
              <div className="card-body text-center">
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500" height="250" width="250" alt="Reviews" className="mb-2 rounded-circle" style={{objectFit: 'cover'}} />
                <p className="text-muted">No fluff, just thoughtful insights from our community.</p>
                <button className="btn btn-outline-dark btn-sm">Read Reviews</button>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow-lg rounded border-0">
              <div className="card-header bg-light">
                <h2 className="h4 fw-semibold text-dark">Your Next Read Awaits</h2>
              </div>
              <div className="card-body text-center">
                <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" height="250" width="250" alt="Next Read" className="mb-2 rounded-circle" style={{objectFit: 'cover'}} />
                <p className="text-muted">From classics to contemporary gems, find your next adventure.</p>
                <button className="btn btn-outline-success btn-sm">Discover Books</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container mt-5 text-center">
        <h2 className="mb-4">Join Our Community</h2>
        <p className="lead">Ready to dive in? Explore reviews from fellow book lovers, or log in to start building your personal collection.</p>
        {actionButtons} {/* This renders the dynamic buttons */}
      </div>
    </div>
  );
};

export default HomePage;