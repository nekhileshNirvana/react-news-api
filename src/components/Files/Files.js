import React, { useEffect, useState } from 'react';
import "./Files.css";
import { AbilityContext, Can } from '../../Ability/Can';
import defineAbilityFor from '../../Ability/defineAbility';
import { Link } from "react-router-dom";

export const Files = ({ role }) => {
  const [articles, setArticles] = useState([]);

  const ability = defineAbilityFor(role);

  useEffect(() => {
    const getArticles = () => {
      fetch('http://localhost:8080/articles/search', { // Assuming this is the correct endpoint for fetching articles
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('Failed to fetch articles!');
        })
        .then((resObject) => {
          setArticles(resObject);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getArticles();
  }, []);


  return (
    <div>
      <h2>Article List</h2>
      <table className="table table-bordered table-custom">
        <thead>
          <tr>
            <th>Article Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Created At</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AbilityContext.Provider value={ability}>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.description}</td>
                <td>{article.category}</td>
                <td>{article.createdAt}</td> {/* Add the correct field for created date */}
                <td>{article.updatedAt}</td> {/* Add the correct field for created by */}
                <td>
                  <Can I="edit" a="Article">
                  <Link
                to={{
                  pathname: `/Edit/${article.id}`, // Assuming a route like /Edit/:articleId
                  state: { article }, // Pass the article data as state
                }}
              >
                <button className="btn btn-primary">Edit</button>
              </Link>
                  </Can>
                </td>
              </tr>
            ))}
          </AbilityContext.Provider>
        </tbody>
      </table>
    </div>
  );
};
