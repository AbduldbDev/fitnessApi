const express = require("express");
const router = express.Router();

const workoutController = require("../controllers/workoutController");
const { verify, verifyAdmin } = require("../auth");

router.post("/addWorkout", verify, workoutController.addWorkout);
router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);
router.delete("/delete/:workoutId", verify, workoutController.deleteWorkout);

module.exports = router;
