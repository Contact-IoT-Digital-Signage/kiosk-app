import "./App.css";

import { useState } from "react";

import { ContentsProvider } from "./context/ContentsContext.js";
import ContentsManager from "./components/ContentsManager.js";
import VideoCallButton from "./components/VideoCallButton";

function App() {
  const [isCallStarted, setCallStarted] = useState(false);

  const videoCallButtonPosition = {
    position: "absolute",
    bottom: "70px",
    right: "120px",
  };

  const selfViewStyle = {
    position: "absolute",
    right: "0px",
    width: "640px",
  };

  const selfViewHidden = {
    visibility: "hidden",
  };

  const participantViewStyle = {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    height: "720px",
    width: "1280px",
    margin: "auto",
  };

  const participantViewHidden = {
    visibility: "hidden",
  };

  const headerStyle = {
    right: "80px",
    position: "absolute",
    color: "white",
    fontSize: "56px",
    fontWeight: "bold",
    width: "480px",
    textAlign: "center",
  };

  const connectingStyle = {
    color: "white",
    fontSize: "124px",
    height: "240px",
    position: "absolute",
    top: "0px",
    bottom: "0px",
    margin: "auto",
    left: "240px",
  };

  return (
    <div className="App">
      <ContentsProvider>
        {!isCallStarted ? <ContentsManager /> : <></>}
      </ContentsProvider>
      {isCallStarted ? (
        <div id="status-window" style={connectingStyle}>
          Connecting...
        </div>
      ) : (
        <></>
      )}
      {isCallStarted ? (
        <div style={headerStyle}>Ask your questions to the stuff!</div>
      ) : (
        <></>
      )}
      <div style={videoCallButtonPosition}>
        <VideoCallButton
          isCallStarted={isCallStarted}
          setCallStarted={setCallStarted}
        />
      </div>
      <canvas
        id="participant-view"
        style={isCallStarted ? participantViewStyle : participantViewHidden}
      ></canvas>
      <video
        id="self-view"
        style={isCallStarted ? selfViewStyle : selfViewHidden}
      ></video>
    </div>
  );
}

export default App;
