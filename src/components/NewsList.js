import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { app, firestore } from '../firebase';
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";


const NewsList = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=in&apiKey=c7e92b0bb0794cc0a1e434031945849f'
                );

                setNews(response.data.articles);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchNews();
    }, []);

    // Handle Favorite Article
    const handleFavorite = async (article) => {
        // Check if the user is logged in
        const user = app.currentUser;
        if (!user) {
          console.log('User not logged in');
          return;
        }
    
        // Add or remove the article from favorites
        const userRef = firestore.collection('users').doc(user.uid);
        const favorites = (await userRef.get()).data()?.favorites || [];
    
        if (favorites.some((fav) => fav.title === article.title)) {
          // Remove from favorites
          const updatedFavorites = favorites.filter((fav) => fav.title !== article.title);
          await userRef.update({ favorites: updatedFavorites });
        } else {
          // Add to favorites
          const updatedFavorites = [...favorites, article];
          await userRef.update({ favorites: updatedFavorites });
        }
      };
    return (

        <Container >
            <Row>
                <Col>
                <h2 className='text-primary mt-3 mb-3 text-center'>Latest Article</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                <Link to="/favorite-article" className='text-primary mt-3 mb-3 float-end'>Favorite Article</Link>
                </Col>
            </Row>
      <Row className='justify-content-between flex-wrap'>
        {news.map((article, index) => (
          <Col key={index} xs={12} md={4} className='mb-3'>
            <div className='border border-primary shadow p-3 rounded'>
              <Image src={article.urlToImage} alt="urlImage" className="img-fluid" rounded />
              <div>
                <button className='float-end mt-1 btn btn-sm-primary'>❤️</button>
                <span>{article.author}</span>
                <span className='ms-3'>
                  <li style={{ color: 'red' }}>{article.publishedAt}</li>
                </span>
                <h5>{article.title}</h5>
                <p>{article.description}</p>
                <Button as="a" href={article.url} variant="primary" target="_blank" rel="noopener noreferrer">
                  Read more <BsArrowRight />
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
    )
}

export default NewsList
