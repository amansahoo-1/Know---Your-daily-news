import React, { Component } from "react";

export class NewsItem extends Component {
  // Function to truncate text with ellipses
  truncateText = (text, maxLength) => {
    return text && text.length > maxLength
      ? text.slice(0, maxLength) + "..."
      : text;
  };

  render() {
    // Destructuring props
    const { title, description, imageUrl, newsUrl } = this.props;

    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem", height: "450px" }}>
          <img
            className="card-img-top"
            src={imageUrl}
            alt={title || "News Image"}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title" style={{ fontSize: "1rem" }}>
              {this.truncateText(title, 45) || "Untitled News"}
            </h5>
            <p
              className="card-text"
              style={{ fontSize: "0.9rem", flexGrow: 1 }}
            >
              {this.truncateText(description, 88) ||
                "No description available."}
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

// Default props to provide fallback values
NewsItem.defaultProps = {
  title: "News Title Not Available",
  description: "Description Not Available",
  imageUrl: "https://via.placeholder.com/150",
  newsUrl: "#",
};

export default NewsItem;
