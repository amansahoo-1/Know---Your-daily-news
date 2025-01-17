import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      error: null,
      page: 1,
    };
  }

  truncateText = (text = "", maxLength = 70) => {
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  fetchData = async (page = 1) => {
    document.title = "Know - Top Headlines";
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const query = this.props.query || "general";

    if (!apiKey) {
      this.setState({
        error: "API Key is missing. Please configure it in the .env file.",
        loading: false,
      });
      return;
    }

    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&page=${page}&apiKey=${apiKey}`;

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

  handlePageChange = (direction) => {
    const { page } = this.state;
    const nextPage = direction === "next" ? page + 1 : page - 1;

    if (nextPage < 1) return;
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

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {`Error: ${error}. Please check your API key or internet connection.`}
          </div>
        )}

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

        <div className="container d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-info"
            onClick={() => this.handlePageChange("prev")}
            disabled={page === 1}
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
