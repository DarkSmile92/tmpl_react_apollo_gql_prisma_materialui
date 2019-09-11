const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// use express middleware to handle cookies (JWT)
server.express.use(cookieParser());
// use express middleware to populate current user
// decode jwt
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for further requests
    req.userId = userId;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: [
        process.env.FRONTEND_URL,
        "https://PROJECTNAME.de",
        "GQLHOSTSERVERIP",
        "CLOUDDEMOIDEIP",
        "https://PROJECTNAME.app",
        "https://CLOUDDEMOIDEIP"
      ]
    },
    uploads: { maxFileSize: 10000000, maxFiles: 10 }
    // debug: true
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
