const axios = require("axios");

exports.getUsers = async (event) => {
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

exports.getPosts = async (event) => {
  console.log("event is", event);
  try {
    if (event.httpMethod !== "GET") {
      throw new Error("Must be a GET Request");
    }
    console.log("one");
    const { queryStringParameters } = event;
    const { id } = queryStringParameters;
    console.log("twp");
    if (!id) {
      throw new Error("id is missing");
    }
    console.log("three");
    if (Number(id) < 0 || Number(id) > 10) {
      throw new Error("invalid id has been entered");
    }
    console.log("four");
    const { data: responseData } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    console.log("five");
    const data =
      responseData?.filter((eachPost) => eachPost["userId"] === id) ?? [];
    console.log("six");
    console.log("data is", data);
    console.log("getReturnValue is", getReturnValue(200, data));
    return getReturnValue(200, data);
  } catch (err) {
    console.log("seven");
    console.error(err);
    const finalData = {
      message: err.message,
      data: [],
    };
    return getReturnValue(400, finalData);
  }
};

function getReturnValue(statusCode = 400, finalData = {}) {
  return {
    isBase64Encoded: false,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
    statusCode,
    body: JSON.stringify(finalData),
  };
}
