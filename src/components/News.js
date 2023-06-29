import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = "in", pageSize = 4, category = "general" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updatePage = async () => {
    const url = `http://localhost:8080/articles`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles((prevArticles) => [...prevArticles, ...parsedData]);
      setTotalResults(parsedData.length);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchNewsData = async () => {
      const url = `http://localhost:8080/articles`;
      setLoading(true);

      try {
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        if (parsedData && parsedData.length > 0) {
          setArticles(parsedData);
          setTotalResults(parsedData.length);
        } else {
          setArticles([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }

      setLoading(false);
    };

    fetchNewsData();
  }, [country, category, pageSize]);
  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    updatePage();
  };

  return (
    <>
      <h1 className="text-center">
        <u>Headlines</u>
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col my-2" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
