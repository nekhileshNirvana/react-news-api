import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  return (
    <div>
      <div className="card" style={{ height: "30rem", width: "18rem" }}>
        <img
          src={
            !imageUrl
              ? "https://images.hindustantimes.com/tech/img/2023/04/28/1600x900/Sun_1677738983844_1682654962091.jpg"
              : imageUrl
          }
          className="card-img-top"
          style={{ height: "10rem" }}
          alt="..."
        />

        <div className="card-body d-flex flex-column justify-content-between align-items-center">
          <p className="card-text fs-6">
            Author:{" "}
            <cite title="Source Title">
              {author ? author : "Unknown"} on{" "}
            </cite>
            <small className="text-body-secondary">{date}</small>
          </p>
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "80%" }}
          >
            {source}
          </span>
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
            style={{ width: "8rem" }}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;