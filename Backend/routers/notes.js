const router = require("express").Router();
const fetchusers = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

router.get("/fetchnotes", fetchusers, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});
router.post(
  "/addnote",
  [
    body("title", "Plaease enter title").isLength({ min: 5 }),
    body("desc", "description is mendatory").isLength({ min: 5 }),
  ],
  fetchusers,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, desc, tag } = req.body;
    try {
      const notes = new Notes({ title, desc, tag, user: req.user.id });
      await notes.save();
      res.json(notes);
    } catch (error) {
      res.status(400).send({ Error: "Some error occured" });
    }
  }
);

router.put('/update/:id',fetchusers, async (req,res)=>{
  const {title, desc, tag} = req.body;
  const newNote={};
  if(title){newNote.title = title}
  if(desc){newNote.desc = desc}
  if(tag){newNote.tag = tag}

  let note =await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}
  if(note.user.toString() !== req.user.id){
    res.status(401).send("unauthorized request")
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
})
router.delete('/delete/:id',fetchusers, async (req,res)=>{
  const {title, desc, tag} = req.body;
  const id =req.params.id;
  // let user= await Notes.findById(id)
  // if(!user){res.status(404).send("User Not Found")}
  // if(user.user.toString() !== req.user.id){res.status(401).send("not allowed to delete user")}
  let note =await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}
  if(note.user.toString() !== req.user.id){
    res.status(401).send("unauthorized request")
    }

 const user = await Notes.findByIdAndDelete(id);
 res.status(200).json({"succes":"Notes deleted successfully",note:note});
})
module.exports = router;
