import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [], // Fetched news articles
      totalResults: 0, // Total number of articles available
      loading: true, // Indicates if data is being fetched
      error: null, // Stores error messages
      page: 1, // Current page number
      country: "us", // Default country
      category: "general", // Default category
    };
  }

  // Utility function to truncate text if it exceeds a specified length
  truncateText = (text = "", maxLength = 70) =>
    text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  // Fetch news articles from the API
  fetchData = async (page = 1) => {
    document.title = `Know - ${this.state.category} Headlines (Page ${page})`;
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const { country, category } = this.state;

    if (!apiKey) {
      this.setState({
        error: "API Key is missing. Please configure it in the .env file.",
        loading: false,
      });
      return;
    }

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=${apiKey}&pageSize=21`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data. HTTP Status: ${response.status}`
        );
      }

      const data = await response.json();
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
        error: null, // Clear previous errors if any
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  // Handle page navigation
  handlePageChange = (direction) => {
    const { page, totalResults } = this.state;
    const totalPages = Math.ceil(totalResults / 21);
    const nextPage = direction === "next" ? page + 1 : page - 1;

    if (nextPage < 1 || nextPage > totalPages) {
      alert("You are already on the first or last page.");
      return;
    }

    this.setState({ page: nextPage, loading: true }, () => {
      this.fetchData(nextPage);
    });
  };

  // Handle user input for country
  handleCountryChange = (event) => {
    this.setState({ country: event.target.value }, () => {
      this.fetchData(1); // Fetch data when country is updated
    });
  };

  // Handle user input for category
  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value }, () => {
      this.fetchData(1); // Fetch data when category is updated
    });
  };

  // Fetch initial articles when the component mounts
  componentDidMount() {
    this.fetchData(this.state.page);
  }

  render() {
    const { articles, loading, error, page, totalResults, country, category } =
      this.state;
    const totalPages = Math.ceil(totalResults / 21);

    return (
      <div className="container my-3">
        <h2 className="text-center">Know - Top Headlines</h2>

        {/* Country and category filters */}
        <div className="mb-3">
          <label htmlFor="countrySelect" className="form-label">
            Select Country:
          </label>
          <select
            id="countrySelect"
            className="form-select"
            value={country}
            onChange={this.handleCountryChange}
          >
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="gb">United Kingdom</option>
            <option value="in">India</option>
            {/* Add more country options as needed */}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">
            Select Category:
          </label>
          <select
            id="categorySelect"
            className="form-select"
            value={category}
            onChange={this.handleCategoryChange}
          >
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        {/* Loading spinner */}
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {`Error: ${error}`}
          </div>
        )}

        {/* News articles */}
        <div className="row">
          {!loading &&
            !error &&
            articles.map((article, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={
                    this.truncateText(article.title, 70) || "Untitled News"
                  }
                  description={
                    this.truncateText(article.description, 88) ||
                    "No description available."
                  }
                  imageUrl={
                    article.urlToImage ||
                    "https://via.placeholder.com/150?text=No+Image+Available"
                  }
                  newsUrl={article.url}
                />
              </div>
            ))}
        </div>

        {/* Pagination buttons */}
        <div className="container d-flex justify-content-between mt-4">
          <button
            className="btn btn-info"
            onClick={() => this.handlePageChange("prev")}
            disabled={page === 1}
          >
            &larr; Previous
          </button>
          <button
            className="btn btn-info"
            onClick={() => this.handlePageChange("next")}
            disabled={page >= totalPages}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
