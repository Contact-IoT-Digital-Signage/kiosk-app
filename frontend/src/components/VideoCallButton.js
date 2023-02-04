import { useState, useEffect } from "react";
import ZoomVideo from "@zoom/videosdk";
import activecallsApi from "../api/activecalls";

const SELF_VIEW = "#self-view";
const PARTICIPANT_VIEW = "#participant-view";
const STATUS_WINDOW = "#status-window";

const VideoCallButton = ({ isCallStarted, setCallStarted }) => {
  const [zoomClient, setZoomClient] = useState();

  const startVideoCall = async () => {
    // these information must be got from API
    const tokenJson = await activecallsApi.generateToken(
      "Ikebukuro Station",
      "Ike0001"
    );

    try {
      await zoomClient.join(
        tokenJson.topic,
        tokenJson.token,
        tokenJson.userName
      );
      const stream = zoomClient.getMediaStream();
      stream.startAudio();
      stream.startVideo({
        videoElement: document.querySelector(SELF_VIEW),
      });
      zoomClient.on("peer-video-state-change", (payload) => {
        if (payload.action === "Start") {
          stream.renderVideo(
            document.querySelector(PARTICIPANT_VIEW),
            payload.userId,
            960,
            540,
            0,
            0,
            2
          );
          document.querySelector(STATUS_WINDOW).style.display = "none";
        } else if (payload.action === "Stop") {
          stream.stopRenderVideo(
            document.querySelector(PARTICIPANT_VIEW),
            payload.userId
          );
          document.querySelector(STATUS_WINDOW).style.display = "block";
        }
      });
      setCallStarted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const endVideoCall = async () => {
    try {
      await zoomClient.leave();
      setCallStarted(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const client = ZoomVideo.createClient();
      client.init("en-US", "CDN");
      client.on("connection-change", (payload) => {
        console.log("connection-change", payload);
        if (payload.state === "Closed") {
          setCallStarted(false);
        }
      });
      client.on("auto-play-audio-failed", () => {
        console.log(
          'You need to run Chromium with a flag "no-user-gesture-required".'
        );
      });
      setZoomClient(client);
    };
    init();
    return async () => {
      ZoomVideo.destroyClient();
    };
  }, [setCallStarted]);

  const videoCallStartButtonStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    height: "60px",
    width: "180px",
    borderRadius: "20px",
    border: "none",
    background: "#008803",
    position: "relative",
    zIndex: "1",
  };

  const videoCallStopButtonStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    height: "60px",
    width: "180px",
    borderRadius: "20px",
    border: "none",
    background: "#dd2a0f",
    position: "relative",
    zIndex: "1",
  };

  return (
    <>
      {!isCallStarted ? (
        <button style={videoCallStartButtonStyle} onClick={startVideoCall}>
          Talk to stuff
        </button>
      ) : (
        <button style={videoCallStopButtonStyle} onClick={endVideoCall}>
          End the call
        </button>
      )}
    </>
  );
};

export default VideoCallButton;
