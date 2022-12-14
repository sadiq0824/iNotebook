const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const fetchusers = require("../middleware/fetchuser");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");


router.get("/data", async (req, res) => {
  const data = await User.find();
  console.log(data);
});
router.post(
  "/createuser",
  [
    body("email", "Please Enter Valid Email").isEmail(),
    body(
      "name",
      "Plaease Enter valid Name and name must contains atleast 5 letters"
    ).isLength({ min: 5 }),
    body("password", "Password length must be 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      }
      let salt = bcrypt.genSaltSync(10);
      let secPass = bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,

        password: secPass,
      });

      let data = {
        user: {
          id: user.id,
        },
      };
      var authtoken = jwt.sign(data, "JWT_Secret");
      
      res.json({success:true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(400).send(success,"Some error occured");
    }
  }
);
router.post('/login', [
  body("email", "Please Enter Valid Email").isEmail(),

  body("password", "Password length must be 5").isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {


    const userlogindata = await User.findOne({ email });
    if (!userlogindata) {
      res.status(400).send({ success,error: "please provide correct credentials" });
    }
    const comparepass = bcrypt.compareSync(password, userlogindata.password);
    if (!comparepass) {
      res.status(400).send({ success,error: "please provide correct credentials" });
    }

    let data = {
      user: {
        id: userlogindata.id,
      },
    };
    var authtoken = jwt.sign(data, "JWT_Secret");
    // sucess=true;
    res.json({ success:true,authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ Error: "Some error occured" });
  }
})

router.post('/getuser', fetchusers, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {

  }
})
module.exports = router;
