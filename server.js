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
const moment = require('moment');

// Sets mailgun
const apiKey = 'key-499843def5fb98f190f28750ae45e872';
const domain = 'sandbox6b1150ae072a4a348d011c2f1ad477c1.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});


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
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Page to chose the slots of time and to show the result
app.get("/events/:id", (req, res) => {

  const templateVar = {};

  // Gets event data from DB by url
  knex('events').where('url', `http://localhost:8080/events/${req.params.id}`)
    .select('id', 'title', 'description', 'location', 'organizer_name', 'organizer_email')
    .then(function(arrayRowsOfEvents) {

    // Protectioin for Unhandled rejection TypeError
      if (arrayRowsOfEvents[0] &&  arrayRowsOfEvents[0].title) {
        templateVar.title = arrayRowsOfEvents[0].title;
        templateVar.description = arrayRowsOfEvents[0].description;
        templateVar.location = arrayRowsOfEvents[0].location;
        templateVar.organizerName = arrayRowsOfEvents[0].organizer_name;
        templateVar.organizerEmail = arrayRowsOfEvents[0].organizer_email;
      }

      // Protectioin for Unhandled rejection TypeError
      if (arrayRowsOfEvents[0] &&  arrayRowsOfEvents[0].id) {

      // Returns event_id to the next query
        return arrayRowsOfEvents[0].id;
      }

    }).then(function(eventID) {

      // Protectioin for Unhandled rejection TypeError
      if (eventID) {
      // Gets slots data from DB by event_id
        knex('slots').where('event_id', eventID).select().then(function(arrayRowsOfSlots) {

          templateVar.slots = arrayRowsOfSlots;

          const arrayOfSlotID = [];

          // Pushs slot_id to arrayOfSlotID to return to the next query
          for (let i = 0; i < arrayRowsOfSlots.length; i++) {

          // Protectioin for Unhandled rejection TypeError
            if (arrayRowsOfSlots[i] &&  arrayRowsOfSlots[i].id) {

              arrayOfSlotID.push(arrayRowsOfSlots[i].id);
            }
          }

          return arrayOfSlotID;


        }).then(function(arrayOfSlotID) {

          const objCountSlotIDs = {};

          for (let i = 0; i < arrayOfSlotID.length; i++) {

            knex('attendees_slots').select('slot_id').count('slot_id').where('slot_id', arrayOfSlotID[i])
              .groupBy('slot_id').then(function(dataSlotIDCount) {

                // Protectioin for Unhandled rejection TypeError
                if(dataSlotIDCount && dataSlotIDCount[0]) {

                  objCountSlotIDs[dataSlotIDCount[0].slot_id] = dataSlotIDCount[0].count;
                }

                // Renders the pages events_show when finished the loop with all data.
                if (i === arrayOfSlotID.length - 1) {

                  templateVar.countSlotIDs = objCountSlotIDs;

                  res.render("events_show", templateVar);
                }

              });
          }

        });
      // End of if -- Protectioin for Unhandled rejection TypeError
      }
    });
});

// POST to get the event data and send to DB
app.post("/events", (req, res) => {

  const dataEvent = req.body;

  knex('events').insert({
    title: dataEvent.title,
    description: dataEvent.description,
    location: dataEvent.location,
    organizer_name: dataEvent.organizerName,
    organizer_email: dataEvent.organizerEmail,
    url: dataEvent.url
  }).then( function() {

    for (const key in dataEvent.slots) {

      knex.select('id')
        .from('events')
        .where('url', dataEvent.url)
        .then( function(rows) {
          return knex.insert({
            date: key,
            start_time: dataEvent.slots[key].startTime,
            end_time: dataEvent.slots[key].endTime,
            event_id: rows[0].id })
            .into('slots');
        }).then( function() {
          console.log("success in interting slot!");
        }).catch(function(error) {
          console.error(error);
        });
    }
  }).catch(function(error) {
    console.error(error);
  });


  //use mailgun to send email to each attendees
  var data = {
    from: 'Dercilio <postmaster@sandbox6b1150ae072a4a348d011c2f1ad477c1.mailgun.org>',
    to: dataEvent.emailAttendees,
    subject: dataEvent.title,
    text: dataEvent.url
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

  res.redirect('/');
});

app.post("/events/attendee-slots", (req, res) => {

  const dataAttenndee = req.body;

  knex('attendees').insert({
    name: dataAttenndee.name,
    email: dataAttenndee.email
  }).then( function() {

    for (let i = 0; i < dataAttenndee.slotsID.length; i++) {

      knex.select('id')
        .from('attendees')
        .where('email', dataAttenndee.email)
        .then( function(rows) {
          knex.insert({
            attendee_id: rows[0].id,
            slot_id: dataAttenndee.slotsID[i] })
            .into('attendees_slots')
            .then(function() {
              console.log("success in interting attendee_slot!");
            });
        }).catch(function(error) {
          console.error(error);
        });
    }
  }).catch(function(error) {
    console.error(error);
  });
  res.send();
});
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
