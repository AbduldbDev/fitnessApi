const Workout = require("../models/Workout");
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const { errorHandler } = require("../auth");
const mongoose = require("mongoose");

module.exports.addWorkout = (req, res) => {
  const { name, duration, userId } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({
      message: "Must be a valid user",
    });
  }

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).send({
      message: "Workout name is required",
    });
  }
  if (!duration || typeof duration !== "string" || duration.trim() === "") {
    return res.status(400).send({
      message: "Duration is required",
    });
  }

  let newWorkout = new Workout({
    userId: req.body.userId,
    name: req.body.name,
    duration: req.body.duration,
  });

  return newWorkout
    .save()
    .then((workout) => {
      return res.status(201).send(workout);
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getMyWorkouts = (req, res) => {
  return Workout.find({ userId: req.user.id })
    .then((workouts) => {
      if (workouts.length === 0) {
        return res.status(200).send({
          workouts: [],
        });
      }
      return res.status(200).send({
        workouts,
      });
    })
    .catch((err) => errorHandler(err, req, res));
};
