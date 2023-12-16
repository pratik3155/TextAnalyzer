import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./mycomponents.js/Navbar.js";
import Tick from "./mycomponents.js/Tick.js";
import About from "./mycomponents.js/About.js";
import { saveText, fetchRecentEntries } from "./mycomponents.js/Api/Api.js";
import Alert from "./mycomponents.js/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [recentEntries, setRecentEntries] = useState([]);
  const [mode, setmode] = useState("success");
  const [alert, setalert] = useState(null);

  useEffect(() => {
    const getRecentEntries = async () => {
      const data = await fetchRecentEntries();
      setRecentEntries(data);
    };
    getRecentEntries();
  }, []);

  const handleSaveText = async (text) => {
    await saveText(text);
    const data = await fetchRecentEntries();
    setRecentEntries(data);
  };

  const ShowAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };

  const toggle = () => {
    if (mode === "success") {
      setmode("dark");
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";

      ShowAlert("Dark mode has been enabled", "success");
    } else {
      setmode("success");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";

      ShowAlert("Light mode has been enabled", "success");
    }
  };
  return (
    <>
      <Router>
        <Navbar title="TextAnalyzer" home="Home" mode={mode} toggle={toggle} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/about" element={<About />}></Route>
            <Route
              exact
              path="/"
              element={
                <Tick
                  title="Enter your text Below : "
                  mode={mode}
                  ShowAlert={ShowAlert}
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
