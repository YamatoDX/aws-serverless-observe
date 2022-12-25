const axios = require("axios");

exports.handler = async (event) => {
  console.log("event is", event);
  try {
    if (event.httpMethod !== "GET") {
      throw new Error("Must be a GET Request");
    }
    const { queryStringParameters } = event;
    const { id } = queryStringParameters;
    if (!id) {
      throw new Error("id is missing");
    }
    if (Number(id) < 0 || Number(id) > 10) {
      throw new Error("invalid id has been entered");
    }
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return getReturnValue(200, data);
  } catch (err) {
    const finalData = {
      message: err.message,
      data: [],
    };
    return getReturnValue(400, finalData);
  }
};

function getReturnValue(statusCode = 400, finalData = {}) {
  return {
    header: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
    statusCode,
    body: JSON.stringify(finalData),
  };
}
