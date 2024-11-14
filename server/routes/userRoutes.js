const {
  register,
  login,
  setAvatar,
  getAllUsers,
  getOneUser
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", register);

router.post("/login", login);

router.post("/setAvatar/:id", setAvatar);

router.get("/allUsers/:id", getAllUsers)

router.post('/user/find', getOneUser)

module.exports = router;
