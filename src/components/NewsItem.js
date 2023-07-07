import React from "react";
import { Card, Badge } from "react-bootstrap";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  return (
    <div>
      <Card style={{ height: "30rem", width: "18rem" }}>
        <Card.Img
          variant="top"
          src={
            !imageUrl
              ? "https://images.hindustantimes.com/tech/img/2023/04/28/1600x900/Sun_1677738983844_1682654962091.jpg"
              : imageUrl
          }
          style={{ height: "10rem" }}
          alt="..."
        />

        <Card.Body className="d-flex flex-column justify-content-between align-items-center">
          <p className="card-text fs-6">
            Author:{" "}
            <cite title="Source Title">
              {author ? author : "Unknown"} on{" "}
            </cite>
            <small className="text-body-secondary">{date}</small>
          </p>
          <Badge pill bg="danger" className="position-absolute top-0 translate-middle" style={{ left: "80%" }}>
            {source}
          </Badge>
          <Card.Title>{title}...</Card.Title>
          <Card.Text>{description}...</Card.Text>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
            style={{ width: "8rem" }}
          >
            Read More
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsItem;
