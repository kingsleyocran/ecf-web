import dayjs from "dayjs";

//let now = dayjs();
// console.log("ISO")
// console.log(now.format());
// console.log("\nTime")
// console.log(now.format("HH:mm:ss"));
// console.log(now.format("h:mm:ss a"));
// console.log("\nDate")
// console.log(now.format("dddd, MMMM D YYYY"));
// console.log(now.format("YYYY-MM-DD"));

export function convertDateTime(date: any, showTime = true, showDay = true) {
  return dayjs(date).format(
    `${showDay ? "ddd -  " : ""}MMM D, YYYY${showTime ? " - HH:mm" : ""}`
  );
}

export function convertDateTextField(timestamp: any) {
  let datetime = dayjs(timestamp);
  return datetime.format("YYYY-MM-DD");
}

// to timestamp
export function convertToTimestamp(date: any) {
  let datetime = dayjs(date);
  return datetime.valueOf();
}

export function convertDateTimeFormat(timestamp: any, format: string) {
  let datetime = dayjs(timestamp);
  return datetime.format(format);
}

// find the time ago
// export function timeAgo(timestamp: any) {
//   let datetime = dayjs(timestamp);
//   return datetime.fromNow();
// }
