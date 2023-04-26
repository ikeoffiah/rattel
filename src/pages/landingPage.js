import React from "react";
import NavBar from "../components/NavBar";
import botImage from "../assets/images/botchat.png";
import 'bootstrap/dist/css/bootstrap.min.css';

function LandingPage() {
  return (
    <div>
      <NavBar />

      <div style={{ backgroundColor: "greenyellow", height: "100vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "start" }}>
            <h2>Train ChatGPT with websites and pdf in seconds</h2>
            <p>
              Upload documents and web links and train chatGpt to understand it
              in seconds
            </p>
            <br />
            <a
              href="/register"
              style={{
                borderColor: "greenyellow",
                backgroundColor: "white",
                color: "black",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              {" "}
              Join now
            </a>
          </div>

          <div>
            <img
              src={botImage}
              alt="bot"
              style={{ width: "600px", height: "400px", borderRadius: "25px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
