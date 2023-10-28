import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom"; // Use useParams to get the article ID from the URL
import axios from "axios"; // Import Axios if you prefer to use it
import './Edit.css'

export const Edit = () => {
  const { articleId } = useParams(); // Get the article ID from the URL

  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [sources, setSources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/categories/search");
        const data = await response.json();

        // Set the fetched categories in the state
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/languages/search");
        const data = await response.json();

        // Set the fetched categories in the state
        setLanguages(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/sources/search");
        const data = await response.json();

        // Set the fetched categories in the state
        setSources(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/countries/search");
        const data = await response.json();

        // Set the fetched categories in the state
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Define state variables for form fields
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [urlToImage, setUrlToImage] = useState("");
  const [country, setCountry] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [fileNames, setFileNames] = useState([]);
  

  const [files, setFiles] = useState([]);
  // Replace with the folder name you want to fetch

  useEffect(() => {
    fetch(`http://localhost:8080/upload/${title}`)
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [title]);
  

  // Fetch the article data by ID when the component mounts
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/articles/search/${articleId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }

        const data = await response.json();

        // Check if data exists and has the expected properties before setting state
        if (data && data.author) {
          setAuthor(data.author);
        } else {
          console.error("Author data is missing");
        }

        if (data && data.title) {
          setTitle(data.title);
        } else {
          console.error("Title data is missing");
        }

        if (data && data.description) {
          setDescription(data.description);
        } else {
          console.error("Description data is missing");
        }

        if (data && data.content) {
          setContent(data.content);
        } else {
          console.error("Content data is missing");
        }

        if (data && data.url) {
          setUrl(data.url);
        } else {
          console.error("URL data is missing");
        }

        if (data && data.urlToImage) {
          setUrlToImage(data.urlToImage);
        } else {
          console.error("URL to Image data is missing");
        }

        if (data && data.country) {
          setCountry(data.country);
        } else {
          console.error("Country data is missing");
        }

        if (data && data.source) {
          setSource(data.source);
        } else {
          console.error("Source data is missing");
        }

        if (data && data.category) {
          setCategory(data.category);
        } else {
          console.error("Category data is missing");
        }

        if (data && data.language) {
          setLanguage(data.language);
        } else {
          console.error("Language data is missing");
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handelFileName = (fileName) => {
    // Add the fileName to the fileNames array
    setFileNames((prevNames) => [...prevNames, fileName]);
  }  
  console.log(fileNames);

  const deleteFiles = async (fileNames) => {
    try {
      for (const fileName of fileNames) {
        const response = await axios.delete(`http://localhost:8080/gcpBucket/delete/${fileName}`);
        if (response.status === 200) {
          console.log(`File ${fileName} deleted successfully`);
        }
      }
    } catch (error) {
      console.error('Error deleting files:', error);
    }
  };

  // Function to handle form submission for editing an article
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = {
      author,
      content,
      description,
      title,
      url,
      urlToImage,
      country,
      category,
      language,
      source,
    };

    console.log(formData);

    try {
      // Send a PUT request to update the article
      const response = await fetch(
        `http://localhost:8080/articles/update/${articleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Article updated successfully");
        setShowModal(true);
        setSubmissionStatus("success");
        setModalMessage("Article updated successfully!");
        deleteFiles(fileNames);
        
      } else {
        console.error("Failed to update the article:", response.status);
        setShowModal(true);
        setSubmissionStatus("error");
        setModalMessage("Failed to update the article. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setShowModal(true);
      setSubmissionStatus("error");
      setModalMessage("An unexpected error occurred. Please try again later.");
    }
  };

  
  const handelDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/articles/delete/${articleId}`); // Replace with your API endpoint

      if (response.status === 200) {
        console.log(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  const handelDownoad = async (fileName) => {
    const url = `https://storage.googleapis.com/news_app/${fileName}`;
    window.open(url);
  }

  return (
    <div className="container" style={{ width: "60vw" }}>
      <Form onSubmit={handleSubmit} className="mt-4 border border-dark p-4">
        <h3 className="text-center">Edit Article</h3>
        <Row>
          <Col>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="url">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="urlToImage">
              <Form.Label>Featured Image</Form.Label>
              <Form.Control
                type="text"
                value={urlToImage}
                onChange={(e) => setUrlToImage(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">{country}</option>
                {countries.map((element) => (
                  <option key={element.con_id} value={element.con_name}>
                    {element.con_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="source">
              <Form.Label>Source</Form.Label>
              <Form.Control
                as="select"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">{source}</option>
                {sources.map((element) => (
                  <option key={element.company_id} value={element.company_name}>
                    {element.company_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">{category}</option>
                {categories.map((element) => (
                  <option key={element.cat_id} value={element.cat_name}>
                    {element.cat_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="language">
              <Form.Label>Language</Form.Label>
              <Form.Control
                as="select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">{language}</option>
                {languages.map((element) => (
                  <option key={element.lang_id} value={element.lang_name}>
                    {element.lang_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <ul className="fileList">
        {files.map((subArray, subArrayIndex) => (
          <li key={subArrayIndex} className="fileView">
            <span>
              {subArray.map((obj, objIndex) => (
                <span key={objIndex} className="fileName">
                  {obj.metadata.name.split('/')[1]}
                  <button
                    className="deleteButton"
                    onClick={() => handelFileName(obj.metadata.name)}
                  >
                    X
                  </button>
                  <button className="downloadButton" onClick={ () => handelDownoad(obj.metadata.name)}>Download</button>
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>

        </Row>
        {/* Add more form fields for description, content, url, urlToImage, country, source, category, language */}
        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            Update Article
          </Button>
          <Button
            variant="primary"
            type="submit"
            style={{ margin: "10px" }}
            onClick={handelDelete}
          >
            Delete Article
          </Button>
        </div>
      </Form>
      
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Form Submission {submissionStatus}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
