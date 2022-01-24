// Different Libraries To import
const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

app.use(express.static("assets"));

// // Middleware 1
// app.use(function (req, res, next) {
//   console.log("Middleware 1");
//   next();
// });

// Contact List
var contactList = [
  {
    name: "John",
    phone: "1234554321",
  },
  {
    name: "Jack",
    phone: "5678998765",
  },
  {
    name: "Tony",
    phone: "3456776543",
  },
];

// Personal Details
var details = [
  {
    name: "Lovish Garg",
    course: "Bachelor of Computer Science & Engineering",
    college: "Chitkara University",
    email: "lavish1953.cse19@chitkara.edu.in",
  },
];

// To render Chatting
app.get("/chatting", (req, res) => {
  return res.render("chatting");
});

// To render Profile
app.get("/profile", (req, res) => {
  return res.render("profile", {
    title: "My Profile Page",
    details: details,
  });
});

// To Render Contact's On Client Side via View
app.get("/", (req, res) => {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error in fetching the contacts from database!");
      return;
    }
    return res.render("home", {
      title: "My Contact List",
      contact_list: contacts,
    });
  });
});

// To Update Contact in Database
app.get("/update", (req, res) => {
  return res.render("update", {
    id: req.query.id,
  });
});

app.post("/update-contact", (req, res) => {
  let id = req.body.id;
  Contact.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err) {
      if (err) {
        console.log("Error in updating the contact in Database!");
      }
      res.redirect("/");
    }
  );
});

// To Add More Contact's To our DataBase
app.post("/create-contact", (req, res) => {
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("Error in creating a contact!");
        return;
      }
      console.log("*********", newContact);
      res.redirect("back");
    }
  );
});

// For a Deleting a Contact From Database
app.get("/delete-contact", (req, res) => {
  let id = req.query.id;
  Contact.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log("Error in deleting the contact from the database!");
      return;
    }
    return res.redirect("back");
  });
});

// To Start Our Server on Port 8000
app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server", err);
  }
  console.log("Yup!My express server is running on the port:", port);
});
