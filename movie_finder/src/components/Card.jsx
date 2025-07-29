import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const CardComponent=({movie})=>{
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"

  const navigate = useNavigate();

  const handleLearnMore = () => {
    console.log("Learn More clicked for movie:", movie.id);
    navigate(`/about/${movie.id}`); 
  }

  return (
    <Card style={{ width: '18rem', marginBottom: '30px' }}>
      <Card.Img variant="top"  src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Button variant="primary" onClick={handleLearnMore}>Learn More</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;