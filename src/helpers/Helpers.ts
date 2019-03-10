class Helpers {
  constructor() {}

  sendResponse(res, statusCode, data) {
    res.status(statusCode).json({ result: data });
  }

  hashCode(s: string) {
    return s.split("").reduce(function(a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };
}

export default new Helpers();
