
import axios from "axios";
import { getToken } from "./getToken";

export default async function listAllEpisodes() {
  var tokens = await getToken();

  var limit = 10;
  var offset = 0;

  var changeAfricaURi = "3ObPf4l0ERAM6hmOsQ0PYk";

  const url = `https://api.spotify.com/v1/shows/${changeAfricaURi}/episodes?market=ES&limit=${limit}&offset=${offset}`;

  const headers = {
    Authorization: `Bearer ${tokens}`,
  };

  const { data } = await axios.get(url, {
    headers: headers,
  });

  return data;
}
