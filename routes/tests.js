const router = require("express").Router();
const Test = require("../db/models/test");
const Student = require("../db/models/student");

router.get("/", async (req, res, next) => {
  try {
    const allTests = await Test.findAll();
    res.send(allTests);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const testById = await Test.findByPk(id);
    res.send(testById);
  } catch (err) {
    next(err);
  }
});

router.post("/student/:studentId", async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const postTest = await Test.create({
      subject: req.body.subject,
      grade: req.body.grade,
      studentId: studentId,
    });
    res.status(201).json(postTest);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const testById = await Test.findByPk(req.params.id);
    const deleteTest = await testById.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
