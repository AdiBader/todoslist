let express = require("express");

let app = express();

app.use(express.static(__dirname + "/dist/angular-todo"));

app.get("/*", (req, resp) => {
  resp.sendFile(__dirname + "/dist/angular-todo/index.html");
});

app.listen(process.env.PORT || 8080);
