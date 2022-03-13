import moment from "moment";
import { Tooltip } from "@mui/material";
import { capitalize } from "./apisauce";

const stringCheck = (input) => {
  return input !== null &&
    input !== "" &&
    input !== undefined &&
    typeof input === "string"
    ? true
    : false;
};

const dateTimeFormate = (stringIso) => {
  let str = stringIso;
  let date = moment(str);
  let dateComponent = date.utc().format("YYYY-MM-DD, HH:mm A");
  return dateComponent;
};
const dateFormate = (stringIso) => {
  let str = stringIso;
  let date = moment(str);
  let dateComponent = date.utc().format("MMM DD, YYYY");
  return dateComponent;
};
const timeFormate = (stringIso) => {
  let str = stringIso;
  let date = moment(str);
  let dateComponent = date.utc().format("HH:mm A");
  return dateComponent;
};
const idToName = (arr, id, key) => {
  if (arr?.length > 0) {
    let obj = arr.filter((item) => item._id == id)[0];
    let out = obj[key];
    return out;
  }
  return true;
};
const lowerSpaceJoinStr = (input) => {
  if (
    input !== null &&
    input !== "" &&
    input !== undefined &&
    typeof input === "string"
  ) {
    let out = input.toLocaleLowerCase();
    return out.split(" ").join("");
  }
  return input;
};
const allWordsCapitalize = (input) => {
  if (
    input !== null &&
    input !== "" &&
    input !== undefined &&
    typeof input === "string"
  ) {
    var words = input?.split(" ");
    var CapitalizedWords = [];
    words.forEach((element) => {
      CapitalizedWords.push(
        element[0]?.toUpperCase() + element?.slice(1, element?.length)
      );
    });
    return CapitalizedWords?.join(" ");
  }
  input = "";
  return input;
};
const trimString = (input, len) => {
  if (stringCheck(input)) {
    input = capitalize(input);
    return input.length > len ? input.substring(0, len) + "..." : input;
  }
  input = "";
  return input;
};
const tooltipTrim = (input, len) => {
  if (stringCheck(input)) {
    input = capitalize(input);
    return input.length > len ? (
      <Tooltip title={input} placement="top">
        <span>{input.substring(0, len) + "..."}</span>
      </Tooltip>
    ) : (
      input
    );
  }
  return input;
};

export {
  dateTimeFormate,
  dateFormate,
  timeFormate,
  idToName,
  lowerSpaceJoinStr,
  allWordsCapitalize,
  trimString,
  tooltipTrim,
};
