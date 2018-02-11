"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const cookieSession = require('cookie-session');

// Sets mailgun
const apiKey = 'key-5412572ac2cdec379260ee493eec6183';
const domain = 'sandbox9190e1faf0154e7ab59d298fdd7a08a5.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: apikey, domain: domain});

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  secret: process.env.SESSION_SECRET || 'development'
}));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
  // prefix: '/styles'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Home page
app.get("/events/:id", (req, res) => {
  const dataEvent = knex('events').where('url', `http://localhost:8080/events/${req.params.id}`).select('title', 'description', 'location', 'organizer_name', 'organizer_email').then(function(result) {
    const templateVar = result[0];
    console.log("success in getting event (without slots) data from DB!");

    const dataSlotsOfEvent = knex('slots').where('event_id', (knex.select('id').from('events').where('url', `http://localhost:8080/events/${req.params.id}`))).select().then(function(result) {
      templateVar.slots = result[0];
      console.log("success in getting slots data from DB!");
      console.log(templateVar);
      res.render("events_show", templateVar);

    });
  });
});

app.post("/events", (req, res) => {

  const dataEvent = req.body;

  //////////////////////////
  // REMOVE !!!           //
  console.log(dataEvent);
  ///////////////////////////

  // Inserts event's data into DB
  knex('events').insert({
    title: dataEvent.title,
    description: dataEvent.description,
    location: dataEvent.location,
    organizer_name: dataEvent.organizerName,
    organizer_email: dataEvent.organizerEmail,
    url: dataEvent.url
  }).then( function() {

    for (const key in dataEvent.slots) {

      console.log(key);
      knex.select('id')
        .from('events')
        .where('url', dataEvent.url)
        .then( function(rows) {
        ////////////////////  REMOVE  /////////////////////////////
        // console.log(`eventID: ${rows[0].id} - typeof: ${typeof rows[0].id}`)
          return knex.insert({ date: key, start_time: dataEvent.slots[key].startTime, end_time: dataEvent.slots[key].endTime, event_id: rows[0].id }).into('slots');
        }).then( function() {
          console.log("success in interting slot!");
        }).catch(function(error) {
          console.error(error);
        });

    }

    console.log("success in insert event to DB!");
  }).catch(function(error) {
    console.error(error);
  });

  //use mailgun to send email to each attendees
  var data = {
    from: 'Mail Gun <postmaster@sandbox9190e1faf0154e7ab59d298fdd7a08a5.mailgun.org>',
    to: 'prerana.sh@gmail.com, sh.sudip@gmail.com, dercilioafontes@gmail.com',
    subject: 'Invitation from schoodle',
    text: 'Testing some Mailgun awesomeness!'
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});