import { useState, useEffect } from "react";
import ZoomVideo from "@zoom/videosdk";

const VideoCallButton = () => {
  const [zoomClient, setZoomClient] = useState()

  const startVideoCall = () => {
    console.log(zoomClient);
  };

  useEffect(() => {
    const init = async () => {
      const client = ZoomVideo.createClient();
      client.init('en-US', 'CDN')

      const topic = ""
      const token = ""
      const userName = ""
 
      client.join(topic, token, userName, password).then(() => {
        stream = client.getMediaStream()
      }).catch((error) => {
        console.log(error)
      })

      setZoomClient(client)
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
    <button style={videoCallButtonStyle} onClick={startVideoCall}>
      Talk to stuff
    </button>
  );
};

export default VideoCallButton;
