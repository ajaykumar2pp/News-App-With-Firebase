import React, { useState, useEffect } from 'react';
import { app, firestore } from '../firebase';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
          const user = app.currentUser;
    
          if (user) {
            const userRef = firestore.collection('users').doc(user.uid);
            const userData = await userRef.get();
            const userFavorites = userData.data()?.favorites || [];
            setFavorites(userFavorites);
          }
        };
    
        fetchFavorites();
      }, []);
  return (
    <div>
    <h2>Favorite Articles</h2>
    <ul>
      {favorites.map((article) => (
        <li key={article.title}>{article.title}</li>
      ))}
    </ul>
  </div>
  )
}

export default Favorites