import React from 'react'

export const NotFound = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card my-5">
            <div className="card-body text-center">
              <h1 className="mb-4">404</h1>
              <h2 className="mb-4">Page Not Found</h2>
              <p>Sorry, the page you are looking for does not exist.</p>
              <button className="btn btn-danger mt-3" onClick={() => window.location.href = '/'}>
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};