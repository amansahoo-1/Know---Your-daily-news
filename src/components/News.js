import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true, // Default to loading while fetching
      error: null, // Track errors
      page: 1, // Track current page
    };
  }

  // Function to truncate text with ellipses
  truncateText = (text, maxLength) => {
    return text && text.length > maxLength
      ? text.slice(0, maxLength) + "..."
      : text;
  };

  // Fetch data after the component mounts
  fetchData = async (page = 1) => {
    document.title = "Know - Top Headlines"; // Set dynamic page title
    const apiKey = "aef6e27394ee48e097230ba35ae36b99"; // Store API key securely in the future
    const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-12-15&sortBy=publishedAt&page=${page}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ articles: data.articles, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  // Handle page change (Next/Previous)
  handlePageChange = (direction) => {
    const { page } = this.state;
    const nextPage = direction === "next" ? page + 1 : page - 1;
    this.setState({ page: nextPage, loading: true }, () => {
      this.fetchData(nextPage);
    });
  };

  componentDidMount() {
    this.fetchData(); // Fetch data for page 1
  }

  render() {
    const { articles, loading, error, page } = this.state;

    return (
      <div className="container my-3">
        <h2 className="text-center">Know - Top Headlines</h2>

        {/* Display loading spinner */}
        {loading && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Display error message */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {`Something went wrong: ${error}`}
          </div>
        )}

        {/* Display news articles */}
        <div className="row">
          {!loading &&
            !error &&
            articles.map((article, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={
                    this.truncateText(article.title, 45) || "Untitled News"
                  }
                  description={
                    this.truncateText(article.description, 88) ||
                    "No description available."
                  }
                  imageUrl={
                    article.urlToImage || "https://via.placeholder.com/150"
                  }
                  newsUrl={article.url}
                />
              </div>
            ))}
        </div>

        {/* Pagination Controls */}
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-info"
            onClick={() => this.handlePageChange("prev")}
            disabled={page === 1} // Disable previous button on first page
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => this.handlePageChange("next")}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
