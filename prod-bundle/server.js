"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _route = _interopRequireDefault(require("./routes/route"));

var _db = _interopRequireDefault(require("./database/db"));

var _html = _interopRequireDefault(require("./html"));

var _expressGraphql = require("express-graphql");

var _schema = _interopRequireDefault(require("./graphql/schema"));

var _resolver = _interopRequireDefault(require("./graphql/resolver"));

var _dotenv = require("dotenv");

(0, _dotenv.config)();
(0, _db["default"])();
var PORT = process.env.PORT || 5000;
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use("/graphql", (0, _expressGraphql.graphqlHTTP)({
  schema: _schema["default"],
  rootValue: _resolver["default"],
  graphiql: true
}));
app.use("/static", _express["default"]["static"](_path["default"].resolve(__dirname, "static")));
app.use("/api", _route["default"]); // PROD ROUTE FOR SSR

if (process.env.NODE_ENV === "production") {
  app.get("/", function (_, res) {
    return res.send((0, _html["default"])());
  });
}

app.listen(PORT, function () {
  console.log("Listening");
});