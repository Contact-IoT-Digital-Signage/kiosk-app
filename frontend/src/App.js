import "./App.css";

import { useState } from "react";

import { ContentsProvider } from "./context/ContentsContext.js";
import ContentsManager from "./components/ContentsManager.js";
import VideoCallButton from "./components/VideoCallButton";

function App() {
  const [callStarted, setCallStarted] = useState(false);

  const videoCallButtonPosition = {
    position: "absolute",
    top: "86%",
    left: "82%",
  };

  const selfViewStyle = {
    position: "absolute",
    bottom: "0px",
    left: "320px",
    height: "360px",
    width: "480px",
  };

  const selfViewHidden = {
    visibility: "hidden"
  };

  const participantViewStyle = {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "1080px",
    width: "1920px",
  };

  const participantViewHidden = {
    visibility: "hidden"
  };

  return (
    <div className="App">
      <ContentsProvider>
        <ContentsManager />
      </ContentsProvider>
      <div style={videoCallButtonPosition}>
        <VideoCallButton setCallStarted={setCallStarted} />
      </div>
      <canvas id="participant-canvas" style={callStarted ? participantViewStyle: participantViewHidden}></canvas>
      <video id="self-view" style={callStarted ? selfViewStyle: selfViewHidden}></video>
    </div>
  );
}

export default App;
