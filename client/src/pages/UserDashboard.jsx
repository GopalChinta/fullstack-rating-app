// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/DashboardStyles.css';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [rating, setRating] = useState('');
  const [userRatings, setUserRatings] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch stores
  useEffect(() => {
    axios.get('http://localhost:5000/api/stores')
      .then(res => setStores(res.data))
      .catch(err => console.error('Error fetching stores:', err));
  }, []);

  // Fetch user's ratings
  useEffect(() => {
    if (user?._id) {
      axios.get(`http://localhost:5000/api/ratings/user/${user._id}`)
        .then(res => setUserRatings(res.data))
        .catch(err => console.error('Error fetching user ratings:', err));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStore || !rating) return alert('Select a store and rating');

    try {
      const res = await axios.post('http://localhost:5000/api/ratings', {
        storeId: selectedStore,
        userId: user._id,
        rating
      });

      alert('Rating submitted!');
      setRating('');
      setSelectedStore('');
      setUserRatings([...userRatings, res.data]);
    } catch (err) {
      console.error(err);
      alert('Failed to submit rating');
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">⭐ User Dashboard</h1>

      <form onSubmit={handleSubmit} className="rating-form">
        <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
          <option value="">Select a store</option>
          {stores.map(store => (
            <option key={store._id} value={store._id}>{store.name}</option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rate 1 to 5"
        />

        <button type="submit">Submit Rating</button>
      </form>

      <h2 className="dashboard-subheading">📋 Your Ratings</h2>
      <ul className="ratings-list">
        {userRatings.map(r => (
          <li key={r._id}>{r.store?.name || 'Unknown'} - {r.rating} ⭐</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
