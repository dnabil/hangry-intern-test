export function response(res, code, msg, data) {
  switch ((code / 100) | 0) {
    case 2: //2xx
      jsonResHelper(res, code, "success", msg, data);
      break;
    case 4: //4xx
      jsonResHelper(res, code, "fail", msg, data);
      break;
    default:
      errResponse(res, code);
      break;
  }
}

export function errResponse(res, code) {
  jsonResHelper(res, code, "error", "server error");
}

function jsonResHelper(res, code, stat, msg, data) {
  let result = {
    status: stat,
    message: msg,
  };

  if (data !== undefined) {
    result.data = data;
  }

  try {
    result = JSON.stringify(result);
  } catch (error) {
    console.error(error);
  }

  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(result);
}

export function getBody(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", (chunk) => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
