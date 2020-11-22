const router = require("express").Router();
const Student = require("../db/models/student");

router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.json(allStudents);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const studentById = await Student.findByPk(studentId);
    if (!studentById) return res.sendStatus(404);
    res.json(studentById);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newStudent = req.body;
    const postNewStudent = await Student.create(newStudent);
    res.status(201).json(postNewStudent);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const update = req.body;
    const updateStudent = await Student.update(update, {
      where: {
        id: studentId,
      },
      returning: true,
      plain: true,
    });
    res.json(updateStudent[1]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const studentById = req.params.id;
    const deleteStudent = await Student.destroy({
      where: {
        id: studentById,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
