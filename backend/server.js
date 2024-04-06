#!/usr/bin/env node
const WebSocket = require("ws");
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./database.json");
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

// Register New User
server.post("/auth/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = "Email and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({ id: last_item_id + 1, email: email, password: password }); //add some data
    var writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  // Create token for new user
  const access_token = createToken({ email, password });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

// Login to one of the users from ./users.json
server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

server.use(router);

const wss = new WebSocket.Server({ noServer: true });
wss.on("connection", (ws) => {
  console.log("WebSocket connection established.");

  // If no data is available
  if (users.length === 0) {
    generateInitialUserData();
  }
  try {
    ws.send(JSON.stringify(users));
  } catch (err) {
    console.error("Error sending initial user data:", err);
    ws.terminate();
  }

  ws.on("error", function error(err) {
    console.error("WebSocket error:", err);
  });

  // update random data in every 1 second
  let intervalId;
  try {
    intervalId = setInterval(() => {
      updateRandomUserPercentage();
      ws.send(JSON.stringify(users)); // Send updated data
    }, 1000);
  } catch (err) {
    console.error("Error updating user data:", err);
    clearInterval(intervalId);
  }

  ws.on("close", function close() {
    console.log("WebSocket connection closed.");
    clearInterval(intervalId); // Clear interval if it exists
  });
});

const httpServer = server.listen(8000, () => {
  console.log("Run Auth API Server");
});

// Attach WebSocket server to the HTTP server
httpServer.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});

// Array to store user data
const users = [];
// generate random 50 users data
function generateInitialUserData() {
  for (let i = 1; i <= 50; i++) {
    const user = {
      id: i,
      name: `User ${i}`,
      percentage: Math.floor(Math.random() * 101), // Random percentage between 0 and 100
    };
    users.push(user);
  }
}
// Function to update percentage for a random user
function updateRandomUserPercentage() {
  const index = Math.floor(Math.random() * users.length); // Select random user index
  users[index].percentage = Math.floor(Math.random() * 101); // Generate random percentage
}
// Function to send updated user data to all clients
function sendUpdatedUserData() {
  const data = JSON.stringify(users);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
