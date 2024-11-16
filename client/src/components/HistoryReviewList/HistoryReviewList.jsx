import "./ReviewList.style.css";
import { useEffect, useState } from "react";

const HistoryReviewList = () => {
  const api_url = process.env.REACT_APP_API_URL;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const response = await fetch(`${api_url}/user/history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };

    fetchReviews();
  }, [api_url]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    };
    const timeString = date.toLocaleTimeString("id-ID", options);
    return `${timeString} - WIB`;
  };

  return (
    <div className="historyreview-container">
      {reviews.map((review) => (
        <div className="historyreview-row" key={review._id}>
          <h1>{review.className}</h1>
          <h3 className="historyreview-row-tanggal">
            {formatDate(review.updatedAt)}
          </h3>
          <h3 className="historyreview-row-jam">
            {formatTime(review.updatedAt)}
          </h3>
          <a href={`/history-detail/${review._id}`}>Detail</a>
        </div>
      ))}
    </div>
  );
};

export default HistoryReviewList;
