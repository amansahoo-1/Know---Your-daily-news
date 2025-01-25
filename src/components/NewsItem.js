import React, { Component } from "react";
import PropTypes from "prop-types";

export class NewsItem extends Component {
  truncateText = (text, maxLength) =>
    text && text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  render() {
    const {
      title,
      description,
      imageUrl,
      newsUrl,
      cardHeight,
      imageHeight,
      titleLength,
      descriptionLength,
    } = this.props;

    const cardStyle = { height: cardHeight || "auto" };
    const imageStyle = {
      height: imageHeight || "15vh",
      objectFit: "cover",
    };

    return (
      <div className="my-3 col-md-4 col-sm-6 col-12">
        <div
          className="card h-100 shadow-lg border-0 rounded-3"
          style={cardStyle}
        >
          <img
            className="card-img-top rounded-top"
            src={imageUrl}
            alt={title || "News Image"}
            style={imageStyle}
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            loading="lazy"
          />
          <div className="card-body d-flex flex-column p-3">
            <h5
              className="card-title"
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              {this.truncateText(title, titleLength)}
            </h5>
            <p
              className="card-text"
              style={{ fontSize: "1rem", color: "#555", flexGrow: 1 }}
            >
              {this.truncateText(description, descriptionLength)}
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary btn-sm mt-auto"
              style={{ borderRadius: "20px", fontWeight: "500" }}
              aria-label={`Read more about ${title}`}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  cardHeight: PropTypes.string,
  imageHeight: PropTypes.string,
  titleLength: PropTypes.number,
  descriptionLength: PropTypes.number,
};

NewsItem.defaultProps = {
  title: "Untitled News",
  description: "No description available.",
  imageUrl: "https://via.placeholder.com/150",
  newsUrl: "#",
  cardHeight: "30vh",
  imageHeight: "15vh",
  titleLength: 50,
  descriptionLength: 100,
};

export default NewsItem;
