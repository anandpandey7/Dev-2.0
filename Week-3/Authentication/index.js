const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  const userExists = ALL_USERS.find(
    (user) => user.username === username && user.password === password
  );
  return !!userExists;

//   for user in ALL_USERS:
//     if (user.username === username && user.password === password) {
//       return true;
//     }
//   }
//   return false;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword );
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    // Filter out the current user
    const otherUsers = ALL_USERS.filter(user => user.username !== username);

    res.json({
      users: otherUsers
    });
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
});

app.listen(3000);
console.log("Server started on http://localhost:3000");

// NOTE : just for being cool


// ALL_USERS.find(...) returns:
// The user object if a match is found
// undefined if no match is found

// So what's !!userExists doing?

// !userExists → converts the value to a boolean and negates it

// !!userExists → negates it again, resulting in the boolean form of the original value