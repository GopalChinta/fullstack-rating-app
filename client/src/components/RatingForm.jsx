import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RatingForm.css";

const RatingForm = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch list of stores from backend
    axios.get("http://localhost:5000/api/stores")
      .then((res) => setStores(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ratings",
        { storeId: selectedStore, rating, feedback },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setMessage("✅ Rating submitted successfully!");
      setSelectedStore("");
      setRating(5);
      setFeedback("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit rating.");
    }
  };

  return (
    <div className="rating-form-container">
      <h2>Rate a Store</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Select Store:</label>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          required
        >
          <option value="">-- Choose Store --</option>
          {stores.map((store) => (
            <option key={store._id} value={store._id}>
              {store.name}
            </option>
          ))}
        </select>

        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <label>Feedback:</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Optional..."
        />

        <button type="submit">Submit Rating</button>
      </form>
    </div>
  );
};

export default RatingForm;
