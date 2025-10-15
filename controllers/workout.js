const Workout = require("../models/Workout");

module.exports.addWorkout = (req, res) => {
  let newWorkout = new Workout({ ...req.body, userId: req.user.id });

  return newWorkout
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.getMyWorkouts = async (req, res) => {
  try {
    const myWorkouts = await Workout.find({ userId: req.user.id });

    if (!myWorkouts || myWorkouts.length === 0)
      return res.status(404).send({ message: "No workouts recorded" });

    res.send({ workouts: myWorkouts });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.updateWorkout = async (req, res) => {
  try {
    const workoutId = req.params.id;
    const allowedUpdates = ["name", "duration"];
    const updateKeys = Object.keys(req.body);
    const validateOperation = updateKeys.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!validateOperation)
      return res.status(400).send("Invalid update attribute");

    const workout = await Workout.findOne({
      userId: req.user.id,
      _id: workoutId,
    });
    if (!workout) return res.status(404).send({ message: "Workout not found" });

    updateKeys.forEach((update) => (workout[update] = req.body[update]));
    await workout.save();

    res.send({
      message: "Workout updated successfully",
      updatedWorkout: workout,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.deleteWorkout = async (req, res) => {
  try {
    const workoutId = req.params.id;

    const deletedWorkout = await Workout.findOneAndDelete({
      _id: workoutId,
      userId: req.user.id,
    });
    if (!deletedWorkout)
      return res.status(404).send({ message: "Workout not found" });

    res.send({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.completeWorkoutStatus = async (req, res) => {
  try {
    const workoutId = req.params.id;

    const tobeCompleted = await Workout.findOne({
      _id: workoutId,
      userId: req.user.id,
    });
    if (!tobeCompleted)
      return res.status(404).send({ message: "Workout not found" });

    if (tobeCompleted.status === "completed")
      return res.status(400).send({ message: "Workout already completed" });

    tobeCompleted.status = "completed";

    await tobeCompleted.save();
    res.send({
      message: "Workout status updated successfully",
      updatedWorkout: tobeCompleted,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
