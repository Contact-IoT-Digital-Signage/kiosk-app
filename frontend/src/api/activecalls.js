const API_ENDPOINT_URL =
  process.env.REACT_APP_ACTIVE_CALLS_API_ENDPOINT + "/dev/";
console.log(API_ENDPOINT_URL)

const ZOOM_TOKEN = process.env.REACT_APP_ZOOM_TOKEN;

const activecallsApi = {
  async generateToken(signageName, signageId) {
    // const result = await fetch(API_ENDPOINT_URL + `?prefix=${CONTENTS_FOLDER}`);
    // const jsonData = await result.json();
    const tokenJson = {
      topic: signageId,
      token: ZOOM_TOKEN,
      userName: signageName,
    };

    return tokenJson;
  },
};

export default activecallsApi;
