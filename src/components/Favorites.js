import React, { useState, useEffect } from 'react';
import { app, firestore } from '../firebase';
import { getAuth } from "firebase/auth";
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { BsArrowRight } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const auth = getAuth(app);

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log('User not logged in');
          return;
        } else {
          console.log("User logged Successful")
        }
        console.log(user)

        const userRef = collection(firestore, `users/${auth.currentUser.uid}/favorites`);
        const userData = await getDocs(userRef);
        const userFavorites = userData.docs.map((doc) => doc.data());
        setFavorites(userFavorites);
        console.log(userFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        toast.error('Error fetching Favorites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (article) => {
    try {
      const userRef = collection(firestore, `users/${auth.currentUser.uid}/favorites`);
      const querySnapshot = await getDocs(userRef);
      const docToRemove = querySnapshot.docs.find((doc) => doc.data().title === article.title);

      if (docToRemove) {
        await deleteDoc(docToRemove.ref);
        toast.success('Removed from Favorites');
        
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.title !== article.title));
      } else {
        toast.warning('Article not found in Favorites');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Error removing from Favorites');
    }
  };

  return (
    <Container >
      <div>
        <h2 className='text-center  mt-3'>Favorite Articles</h2>

        <Row>
          <Col>
            <Link to="/news" className='text-primary mt-2 mb-3 float-end text-decoration-none'>Go to News Article</Link>
          </Col>
        </Row>

        {
          loading ? (
            <h5 className='text-center text-bg-secondary py-3'>Loading News...</h5>

          ) : (
            <Row className='justify-content-between flex-wrap'>
              {favorites.map((article, index) => (
                <Col key={index} xs={12} md={4} className='mb-3'>
                  <div className='border border-primary shadow p-3 rounded'>
                    <Image src={article.urlToImage} alt="urlImage" className="img-fluid" rounded />
                    <div>

                      <span>{article.author}</span>
                      <span className='ms-3'>
                        <li style={{ color: 'red' }}>{article.publishedAt}</li>
                      </span>
                      <h5>{article.title}</h5>
                      <div className='d-flex justify-content-between'>
                        <Button as="a" href={article.url} variant="primary" target="_blank" rel="noopener noreferrer">
                          Read more <BsArrowRight />
                        </Button>
                        <Button variant="danger"onClick={() => handleRemove(article)}  >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )
        }
      </div>
    </Container>
  )
}

export default Favorites