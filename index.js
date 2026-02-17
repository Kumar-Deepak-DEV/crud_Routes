const express = require("express");

const app = express();

app.use(express.json());

const users = [
  { uid: 108716, name: "Aditya", totalSubj:14, bonus:20, attendance:80 },
  { uid: 108429, name: "Deeppak", totalSubj:14, bonus:200, attendance:100 },
  { uid: 108428, name: "Ronit", totalSubj:14, bonus:10, attendance:75 },
  { uid: 108685, name: "Harshit", totalSubj:14, bonus:30, attendance:90 },
  { uid: 108412, name: "Tapan", totalSubj:14, bonus:32, attendance:89 },
];

app.get("/user/:uid", (req, res) => {
  const userUid = Number(req.params.uid);
  const user = users.find(u => u.uid === userUid);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});


app.post("/users", (req, res) => {

    const newUser = {
    uid:req.body.uid,
    name:req.body.name,
    totalSubj:req.body.totalSubj, 
    bonus:req.body.totalSubj, 
    attendance:req.body.totalSubj
  };

  users.push(newUser);
  
  res.status(201).json({
    message: "Users created",
    user: newUser
  });
});

app.put("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) return res.status(404).json({ message: "User not found" });

  users[index] = {
    uid:req.body.uid,
    name:req.body.name,
    totalSubj:req.body.totalSubj, 
    bonus:req.body.bonus, 
    attendance:req.body.attendance
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});


app.patch("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

    if (req.body.uid) user.uid=req.body.uid;
    if (req.body.name) user.name=req.body.name;
    if (req.body.totalSubj) user.totalSubj=req.body.totalSubj;
    if (req.body.bonus) user.bonus=req.body.bonus;
    if (req.body.attendance) user.attendance=req.body.attendance;
    

  res.status(200).json({
    message: "User updated",
    user
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});