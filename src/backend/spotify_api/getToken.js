import axios from "axios";

export async function getToken() {
  var client_id = process.env.SPOTIFY_CLI_ID;
  var client_secret = process.env.SPOTIFY_CLI_SEC;

  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://accounts.spotify.com/api/token?grant_type=client_credentials",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const { data } = await axios(config);
  return data.access_token;
}