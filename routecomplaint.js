const express = require("express");
const router = express.Router();
const Complaint = require("./complaint");

router.post("/register/complaint", (req, res) => {
  const newComplaint = new Complaint({
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,
    timestamps: req.body.timestamps,
  });

  newComplaint
    .save()
    .then((document) => {
      res.json({
        state: true,
        msg: "data inserted successully",
        document: document,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/getcomplaint", (req, res) => {
  Complaint.find({ username: req.body.username }).then((document) => {
    res.json({
      status: 200,
      message: "User data fetched Successfully",
      Userdata: document,
    });
  });
});

router.put("/updatecomplaint/:username", (req, res, next) => {
  const newuser = { _username: req.params.username };
  Complaint.updateOne(newuser, {
    title: req.body.title,
    description: req.body.description,
  })
    .then((doc) => {
      if (!doc) {
        return res.st(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
});

router.delete("/delete/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then((document) => {
      res.json({
        status: 200,
        message: "Users data deleted Successfully",
        document: document,
      });
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then((documents) => {
    if (documents) {
      res.status(200).json(documents);
    } else {
      res.status(404).json({ message: "data not found" });
    }
  });
});

module.exports = router;
