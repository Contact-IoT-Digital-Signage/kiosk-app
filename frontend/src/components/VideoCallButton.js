import { useState, useEffect } from "react";
import ZoomVideo from "@zoom/videosdk";

const ZOOM_TOKEN = process.env.REACT_APP_ZOOM_TOKEN;

const VideoCallButton = ({ setCallStarted }) => {
  const [zoomClient, setZoomClient] = useState();

  const startVideoCall = () => {
    const topic = "MYTOPIC";
    const token = ZOOM_TOKEN
    console.log(token)
    const userName = "user1";

    zoomClient
      .join(topic, token, userName)
      .then(() => {
        const stream = zoomClient.getMediaStream();
        setCallStarted(true);
        stream.startAudio();

        zoomClient.on("auto-play-audio-failed", () => {
          console.log("auto play failed, waiting for a user interaction");
        });
        stream.startVideo({
          videoElement: document.querySelector("#self-view"),
        });
        zoomClient.on("peer-video-state-change", (payload) => {
          if (payload.action === "Start") {
            stream.renderVideo(
              document.querySelector("#participant-canvas"),
              payload.userId,
              1920,
              1080,
              0,
              0,
              2
            );
          } else if (payload.action === "Stop") {
            stream.stopRenderVideo(
              document.querySelector("#participant-canvas"),
              payload.userId
            );
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const init = async () => {
      const client = ZoomVideo.createClient();
      client.init("en-US", "CDN");
      setZoomClient(client);
    };
    init();
    return () => {
      ZoomVideo.destroyClient();
    };
  }, []);

  const videoCallButtonStyle = {
    fontSize: "48px",
    fontWeight: "bold",
    color: "white",
    height: "120px",
    width: "300px",
    borderRadius: "20px",
    border: "none",
    background: "#FFA500",
  };

  return (
    <>
      <button style={videoCallButtonStyle} onClick={startVideoCall}>
        Talk to stuff
      </button>
    </>
  );
};

export default VideoCallButton;
