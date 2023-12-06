import React, { useState, useEffect } from 'react';
import { app, firestore } from '../firebase';
import { getAuth } from "firebase/auth";
import { collection, addDoc,doc , getDoc,updateDoc} from "firebase/firestore"; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      console.log(user)
      if (user) {

        const userRef = doc(collection(firestore, 'users'), user.uid);
        const userData = await getDoc(userRef);
        const userFavorites = userData.data()?.favorites || [];
        setFavorites(userFavorites);
      }
    };

    fetchFavorites();
  }, []);
  return (
    <Container >
    <div>
      <h2 className='text-center  mt-3'>Favorite Articles</h2>

      <Row>
        <Col>
          <Link to="/news" className='text-primary mt-2 mb-3 float-end text-decoration-none'>Go to News Article</Link>
        </Col>
      </Row>
      <ul>
        {favorites.map((article) => (
          <li key={article.title}>{article.title}</li>
        ))}
      </ul>
    </div>
    </Container>
  )
}

export default Favorites