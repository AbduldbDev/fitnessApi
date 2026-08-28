const express = require("express");
const router = express.Router();

const workoutContoller = require("../controllers/workoutController");
const { verify, verifyAdmin } = require("../auth");

router.post("/addWorkout", verify, workoutContoller.addWorkout);
router.get("/getMyWorkouts", verify, workoutContoller.getMyWorkouts);

module.exports = router;
