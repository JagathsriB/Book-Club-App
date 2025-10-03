import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div>
      <div className="container text-center mt-2">
        <h1 className="display-4 fw-bold text-primary">The Book Club</h1>
        <p className="p-2 bg-warning fst-italic lead">
          A place where pages connect people
        </p>
      </div>

      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e0e0e0" }}>
        <div className="container-fluid">
          <ul className="navbar-nav d-flex justify-content-between w-100">
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">Browse</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">Add a Review</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">View Your Collection</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">Connect</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">About</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="w-100" style={{ margin: 0, padding: 0 }}>
  <Carousel>
      <Carousel.Item interval={4000}>
        <a href="https://images.unsplash.com/photo-1722182877533-7378b60bf1e8?w=1200&auto=format&fit=crop&q=60" target="_blank" rel="noopener noreferrer">
          <img
            src="https://images.unsplash.com/photo-1722182877533-7378b60bf1e8?w=1200&auto=format&fit=crop&q=60"
            className="w-100"
            style={{ height: '500px', objectFit: 'cover' }}
          />
        </a>
        <Carousel.Caption>
          <h4>First</h4>
          <p>Escape the ordinary and step into unforgettable stories.</p>
        </Carousel.Caption>
      </Carousel.Item>

          <Carousel.Item interval={4000}>
            <a href="https://images.unsplash.com/photo-1561616612-e2398d7ec6a8?w=1200&auto=format&fit=crop&q=60" target="_blank" rel="noopener noreferrer">
              <img
                src="https://images.unsplash.com/photo-1561616612-e2398d7ec6a8?w=1200&auto=format&fit=crop&q=60"
                className="w-100"
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </a>
            <Carousel.Caption>
              <h4>Second</h4>
              <p>No fluff, just thoughtful insights.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={4000}>
            <a href="https://images.unsplash.com/photo-1667929048193-4fef49b0ba0a?w=1200&auto=format&fit=crop&q=60" target="_blank" rel="noopener noreferrer">
              <img
                src="https://images.unsplash.com/photo-1667929048193-4fef49b0ba0a?w=1200&auto=format&fit=crop&q=60"
                className="w-100"
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </a>
            <Carousel.Caption>
              <h4>Third</h4>
              <p>From classics to contemporary gems.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>


      <div className="container mt-5">
        <div className="row align-items-stretch g-4">

          <div className="col-12 col-md-4 mb-4">
            <div className="card h-100 shadow-lg rounded border-0">
              <div className="card-header bg-light">
                <h2 className="h4 fw-semibold text-dark">Dive Into Fictional Worlds</h2>
              </div>
              <div className="card-body">
                <img
                  src="https://plus.unsplash.com/premium_photo-1678990345767-a423a9a8edf2?w=500&auto=format&fit=crop&q=60"
                  height="300"
                  width="300"
                  alt="Fiction"
                />
                <p className="mt-2 text-muted">
                  Escape the ordinary and step into unforgettable stories. Discover gripping narratives,
                  powerful characters, and reviews that bring every page to life.
                </p>
              </div>
            </div>
          </div>

    
          <div className="col-12 col-md-4 mb-4">
            <div className="card h-100 shadow-lg rounded border-0">
              <div className="card-header bg-light">
                <h2 className="h4 fw-semibold text-dark">Honest Reviews, Real Readers</h2>
              </div>
              <div className="card-body">
                <img
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&auto=format&fit=crop&q=60"
                  height="300"
                  width="300"
                  alt="Reviews"
                />
                <p className="mt-2 text-muted">
                  No fluff, just thoughtful insights. Our community shares genuine opinions to help you
                  pick your next favorite read with confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="card h-100 shadow-lg rounded border-0">
              <div className="card-header bg-light">
                <h2 className="h4 fw-semibold text-dark">Your Next Read Awaits</h2>
              </div>
              <div className="card-body">
                <img
                  src="https://images.unsplash.com/photo-1697029749544-ffa7f15f9dd0?w=500&auto=format&fit=crop&q=60"
                  height="300"
                  width="300"
                  alt="Next Read"
                />
                <p className="mt-2 text-muted">
                  From classics to contemporary gems. Explore curated book lists, trending reviews,
                  and personalized picks just for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <div className="btn-group">
          <button type="button" className="btn btn-primary text-white">Facebook</button>
          <button type="button" className="btn btn-dark text-white">Twitter</button>
          <Link to="/reportForm">
          <button type="button" className="btn btn-danger text-white">Report</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
