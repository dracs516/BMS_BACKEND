const express = require("express");
const router = express.Router();
const User = require("./user");

router.post("/register", (req, res) => {
  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    room_no: req.body.room_no,
    hostel: req.body.hostel,
    phone_num: req.body.phone_num,
    password: req.body.password,
    timestamps: req.body.timestamps,
  });

  newUser
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

// router.get("/getuser", (req, res) => {
//   User.find({ username: req.body.username }).then((document) => {
//     res.json({
//       status: 200,
//       message: "User data fetched Successfully",
//       document: document,
//     });
//   });
// });

router.post("/verify", (req, res) => {
  // const verifyUser = new User({
  //   username: req.body.username,
  //   password: req.body.password,
  // });
  User.find({ username: req.body.username, password: req.body.password })
    .then((document) => {
      if (document[0].username != null) {
        res.json({
          status: 200,
          message: "User data fetched Successfully",
          // data: document.some(
          //   (person) =>
          //     person.username === verifyUser.username &&
          //     person.password === verifyUser.password
          // ),
          document: document,
        });
      } else {
        res.json({ status: 503 });
      }
    })
    .catch(() => {
      res.json({ status: 503 });
    });
});

router.get("/all", (req, res) => {
  User.find()
    .then((document) => {
      res.json(document);
    })
    .catch(() => {
      res.json(document);
    });
});

// router.get("/verify", (req, res) => {
//   User.find({ username: req.body.username, password: req.body.password }).then(
//     (document) => {
//       if (document) {
//         console.log(document);
//         res.json({
//           status: 200,
//           message: "Verified",
//           data: document,
//         });
//       } else {
//         res.json({
//           status: 503,
//         });
//       }
//     }
//   );
// });

router.put("/update/:id", (req, res, next) => {
  const newuser = { _id: req.params.id };
  User.updateOne(newuser, {
    name: req.body.name,
    email: req.body.email,
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
