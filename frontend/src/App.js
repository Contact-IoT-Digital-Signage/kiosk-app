import "./App.css";

import { ContentsProvider } from "./context/ContentsContext.js";
import ContentsManager from "./components/ContentsManager.js";
import VideoCallButton from "./components/VideoCallButton";

function App() {
  const videoCallButtonPosition = {
    position: "absolute",
    top: "86%",
    left: "82%",
  };

  return (
    <div className="App">
      <ContentsProvider>
        <ContentsManager />
      </ContentsProvider>
      <div style={videoCallButtonPosition}>
        <VideoCallButton />
      </div>
    </div>
  );
}

export default App;
