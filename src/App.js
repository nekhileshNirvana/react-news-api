import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React,{useState, useEffect} from 'react';
import Form from './components/Form';



export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8080/protected", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  console.log(user);

  return (
    <div>
      <BrowserRouter>
        <Navbar user = {user}/>
        <Routes>
          <Route
            exact
            path="/"
            element={<News key="" pageSize={8} country="in" category="" />}
          />
          <Route
            exact
            path="/business"
            element={<News key="business" pageSize={8} country="in" category="business" />}
          />
          <Route
            exact
            path="/entertainment"
            element={<News key="entertainment" pageSize={8} country="in" category="entertainment" />}
          />
         
          <Route
            exact
            path="/health"
            element={<News key="health" pageSize={8} country="in" category="health" />}
          />
          <Route
            exact
            path="/science"
            element={<News key="science" pageSize={8} country="in" category="science" />}
          />
          <Route
            exact
            path="/sports"
            element={<News key="sports" pageSize={8} country="in" category="sports" />}
          />
          <Route
            exact
            path="/technology"
            element={<News key="technology" pageSize={8} country="in" category="technology" />}
          />
          <Route
            exact
            path="/form"
            element={<Form/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}