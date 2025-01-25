import React, { Component } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 10,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  state = {
    articles: [],
    loading: true,
    page: 1,
    totalResults: 0,
    error: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { category, country } = this.props;
    if (prevProps.category !== category || prevProps.country !== country) {
      this.setState({ page: 1 }, this.fetchData);
    }
  }

  fetchData = async () => {
    try {
      this.setState({ loading: true, error: null });
      const { country, category, pageSize } = this.props;
      const { page } = this.state;
      const apiKey = process.env.REACT_APP_NEWS_API_KEY;

      if (!apiKey) throw new Error("API key is missing.");

      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch news articles.");

      const data = await response.json();
      this.setState({
        articles: data.articles || [],
        totalResults: data.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handlePageChange = (direction) => {
    const { page } = this.state;
    const nextPage = page + direction;
    const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

    if (nextPage < 1 || nextPage > totalPages) return;

    this.setState({ page: nextPage }, this.fetchData);
  };

  render() {
    const { articles, loading, error, page } = this.state;
    const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

    return (
      <div className="container my-4">
        <h1 className="text-center mb-4">
          Top Headlines - {this.props.category}
        </h1>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          {!loading &&
            !error &&
            articles.map((article, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card">
                  <img
                    src={
                      article.urlToImage || "https://via.placeholder.com/150"
                    }
                    className="card-img-top"
                    alt={article.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">
                      {article.description || "No description available."}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => this.handlePageChange(-1)}
            disabled={page === 1}
          >
            &laquo; Previous
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => this.handlePageChange(1)}
            disabled={page === totalPages}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

// for categories to be chaged while surfing
const NewsWrapper = () => {
  const { category } = useParams();
  return <News category={category || "general"} />;
};

export default NewsWrapper;
