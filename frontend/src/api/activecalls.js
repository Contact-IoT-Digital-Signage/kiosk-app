const API_ENDPOINT_URL =
  process.env.REACT_APP_ACTIVE_CALLS_API_ENDPOINT + "/dev/";

const activecallsApi = {
  async generateToken(signageId, signageName) {
    // const result = await fetch(API_ENDPOINT_URL + `?prefix=${CONTENTS_FOLDER}`);
    // const jsonData = await result.json();
    const data = {
        "tpc": signageId,
        "signageName": signageName
    }
    const result = await fetch(API_ENDPOINT_URL + "activecalls", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resultJson = await result.json()
    const tokenJson = {
      topic: signageId,
      token: resultJson.token,
      userName: signageName,
    };

    return tokenJson;
  },

  deleteActivecalls: async (tpc) => {
    const body = {
      tpc: tpc,
    };
    const endpoint = API_ENDPOINT_URL + "activecall";
    await fetch(endpoint, {
      method: "DELETE",
      body: JSON.stringify(body),
    });
  },
};

export default activecallsApi;
