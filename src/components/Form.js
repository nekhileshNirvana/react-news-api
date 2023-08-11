import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import "./Form.css";

const MyForm = () => {
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [sources, setSources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const saveChanges = () => {
    setAuthor("");
    setTitle("");
    setDescription("");
    setContent("");
    setUrl("");
    setUrlToImage("");
    setCountry("");
    setSource("");
    setCategory("");
    setLanguage("");
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the form data
    const currentDate = new Date();
    const formData = {
      author,
      content,
      description,
      publishedAt: currentDate.toISOString(), // Convert to ISO 8601 format
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
      const response = await fetch("http://localhost:8080/articles/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Article data saved");
        setShowModal(true);
        setSubmissionStatus('success');
        setModalMessage('Form submitted successfully!');
      } else {
        console.error("Failed to save article data:", response.status);
        setShowModal(true);
        setSubmissionStatus('error');
        setModalMessage('Form submission failed field was empty. Please try again.');
        // Additional error handling if needed
      }
    } catch (error) {
      console.error("Network error:", error);
      setShowModal(true);
      setSubmissionStatus('error');
      setModalMessage('An unexpected error occurred. Please try again later.');
    }
  
    // Reset the form fields
    setAuthor("");
    setTitle("");
    setDescription("");
    setContent("");
    setUrl("");
    setUrlToImage("");
    setCountry("");
    setSource("");
    setCategory("");
    setLanguage("");
  };

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };
  
  return (
    <div className="container" style={{ width: '60vw' }}>
      <Form onSubmit={handleSubmit} className="mt-4 border border-dark p-4">
        <h3 className="text-center">Create Article</h3>
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
                <option value="">Select a country</option>
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
                <option value="">Select a source</option>
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
                <option value="">Select a category</option>
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
                <option value="">Select a language</option>
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
        <label htmlFor="files">Select files:</label>
      <input
        type="file"
        id="files"
        name="files"
        multiple
        onChange={handleFileChange}
      />
        </Row>
        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Form Submission {submissionStatus}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyForm;
