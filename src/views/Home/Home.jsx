import React from 'react'
import "./Home.css";

export const Home = () => {
  return (
    <div className="carousel-container">
      <div className="carousel slide" data-bs-ride="carousel" id="carouselExampleIndicators">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              alt="Espacio de trabajo colaborativo"
              className="d-block carousel-image"
              src="../../img/home1.jpg"
            />
            <div className="carousel-caption">
              <h5 className="animated bounceInRight" style={{ animationDelay: '1s' }}>
                Espacios Innovadores
              </h5>
              <p
                className="animated bounceInLeft d-none d-md-block"
                style={{ animationDelay: '2s' }}
              >
                Ven y transforma tu creatividad en acción en nuestros espacios colaborativos.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              alt="Tecnología avanzada"
              className="d-block carousel-image"
              src="../../img/home2.jpg"
            />
            <div className="carousel-caption">
              <h5 className="animated bounceInRight" style={{ animationDelay: '1s' }}>
                Tecnología de Vanguardia
              </h5>
              <p
                className="animated bounceInLeft d-none d-md-block"
                style={{ animationDelay: '2s' }}
              >
                Equipados con herramientas de última generación para llevar tus ideas al siguiente nivel.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              alt="Comunidad colaborativa"
              className="d-block carousel-image"
              src="../../img/home3.jpg"
            />
            <div className="carousel-caption">
              <h5 className="animated bounceInRight" style={{ animationDelay: '1s' }}>
                Comunidad Vibrante
              </h5>
              <p
                className="animated bounceInLeft d-none d-md-block"
                style={{ animationDelay: '2s' }}
              >
                Únete a una red de mentes creativas que comparten tu pasión.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};