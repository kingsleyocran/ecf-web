//
export default async function episodesApiRequest() {
  var res = await fetch("/api/podcast", {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    //body: JSON.stringify(dataPayload),
  });

  if (res.status == 200) {
    //console.log("Response success");
    return res.json();
  } else {
    //console.log("Response failed");
    return res.json();
  }
}
