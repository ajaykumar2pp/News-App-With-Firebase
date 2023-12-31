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
import { getAuth } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegHeart } from "react-icons/fa";


const auth = getAuth(app);

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offlineArticles, setOfflineArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          // 'https://gnews.io/api/v4/top-headlines?category=general&apikey=2fa044e1d79c63b51d975d617887ee22'
          'https://gnews.io/api/v4/top-headlines?category=general&apikey=2fa044e1d79c63b51d975d617887ee22'
        );
        console.log('News data:', response.data);
        setNews(response.data.articles);

        // Cache the articles in localstorage
        localStorage.setItem('cachedArticles', JSON.stringify(response.data.articles));


      } catch (error) {
        console.error(error.message);

        //try to retrieve cached articles from localStorage
        const cachedArticles = localStorage.getItem('cachedArticles');
        if (cachedArticles) {
          setOfflineArticles(JSON.parse(cachedArticles));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleFavorite = async (article) => {
    try {
      if (!auth.currentUser) {
        console.log('User not authenticated. Unable to add/remove from favorites.');
        return;
      }

      const favoritesCollection = collection(firestore, `users/${auth.currentUser.uid}/favorites`);
      const querySnapshot = await getDocs(favoritesCollection);

      const docToRemove = querySnapshot.docs.find((doc) => doc.data().title === article.title);

      if (docToRemove) {
        await deleteDoc(docToRemove.ref);
        toast.error('Removed from Favorites');
      } else {
        await addDoc(favoritesCollection, article);
        toast.success('Added to Favorites');
      }
    } catch (error) {
      console.error('Error handling favorites:', error);
      toast.error('Error handling Favorites');
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
      {
        loading ? (
          <h5 className='text-center text-bg-secondary py-3'>Loading Latest News...</h5>

        ) : (
          <Row className='justify-content-between flex-wrap'>
            {(news.length > 0 ? news : offlineArticles).map((article, index) => (
              <Col key={index} xs={12}  md={4}   className='mb-3'>
                <div className='border border-primary shadow p-2 rounded'>
                  <Image src={article.image} alt="urlImage" className="card-img-top p-2" rounded />
                  <div>
                    <button onClick={() => handleFavorite(article)} className='float-end mt-1 btn btn-sm-primary'><FaRegHeart /></button>
                    <span>{article.author}</span>
                    <span className='ms-3'>
                      <li style={{ color: 'red' }}>{new Date(article.publishedAt).toLocaleString('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</li>
                    </span>
                    <h5>{article.title}</h5>
                    <p >{article.description}</p>
                    <Button as="a" href={article.url} variant="primary" target="_blank" rel="noopener noreferrer">
                      Read more <BsArrowRight />
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )
      }

    </Container>
  )
}

export default NewsList
