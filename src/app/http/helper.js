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
  res.writeHead(code, { "Content-Type": "application/json" });
  if (data === undefined) {
    res.end(`{
      "status": "${stat}",
      "message": "${msg}"
    }`);
  } else {
    res.end(`{
      "status": "${stat}",
      "message": "${msg}",
      "data": ${data}
    }`);
  }
}
