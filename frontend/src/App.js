import "./App.css";

import { useState } from "react";

import { ContentsProvider } from "./context/ContentsContext.js";
import ContentsManager from "./components/ContentsManager.js";
import VideoCallButton from "./components/VideoCallButton";
import Clock from "./components/Clock";

function App() {
  const [isCallStarted, setCallStarted] = useState(false);

  const videoCallButtonPosition = {
    position: "absolute",
    bottom: "30px",
    right: "30px",
  };

  const selfViewStyle = {
    position: "absolute",
    right: "5px",
    width: "240px",
  };

  const selfViewHidden = {
    visibility: "hidden",
  };

  const participantViewStyle = {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    height: "405px",
    width: "720px",
    margin: "auto",
  };

  const participantViewHidden = {
    visibility: "hidden",
  };

  const headerStyle = {
    right: "0px",
    position: "absolute",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    width: "240px",
    textAlign: "center",
    top: "80px",
    border: "4px solid white",
  };

  const titleStyle = {
    position: "absolute",
    fontSize: "36px",
    left: "0px",
    right: "0px",
    margin: "auto",
    color: "white",
    fontWeight: "bold",
    width: "1024px",
    textAlign: "center",
    background: "#008803",
  };

  const connectingStyle = {
    color: "white",
    fontSize: "80px",
    height: "120px",
    position: "absolute",
    top: "60px",
    bottom: "0px",
    margin: "auto",
    left: "360px",
  };

  const footerStyle = {
    position: "absolute",
    fontSize: "36px",
    color: "white",
    left: "330px",
    fontWeight: "bold",
    bottom: "15px",
  };

  return (
    <div className="App">
      <ContentsProvider>
        {!isCallStarted ? <ContentsManager /> : <></>}
      </ContentsProvider>
      {isCallStarted ? (
        <div id="status-window" style={connectingStyle}>
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isCallStarted ? (
        <>
          <div style={titleStyle}>Contact Signage Mode</div>
          <div style={headerStyle}>Ask your questions to the stuff!</div>
          <div style={footerStyle}>
            <Clock />
          </div>
          <canvas
            id="participant-view"
            style={isCallStarted ? participantViewStyle : participantViewHidden}
          ></canvas>
        </>
      ) : (
        <></>
      )}
      <div style={videoCallButtonPosition}>
        <VideoCallButton
          isCallStarted={isCallStarted}
          setCallStarted={setCallStarted}
        />
      </div>
      <video
        id="self-view"
        style={isCallStarted ? selfViewStyle : selfViewHidden}
      ></video>
    </div>
  );
}

export default App;
