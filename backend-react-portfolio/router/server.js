// const express = require("express");
// const mongoose = require("./database.js");
// const PersonalSchema = require("./models/homeSchema.js");
// const app = new express();

// app.use(express.json());

// // POST METHOD

// app.post("/post", async (req, res) => {
//   console.log("Inside post function");

//   const data = new PersonalSchema({
//     name: req.body.name,
//     skills: req.body.skills,
//   });

//   try {
//     const val = await data.save();
//     res.json(val);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to save data" });
//   }
// });

// // PUT METHOD
// app.put("/put/:email", async (req, res) => {
//   console.log("Inside put function");
//   emailID = req.params.email;
//   const { firstName: firstNameUp, lastName: lastNameUp, DOB: DOBUp } = req.body;

//   try {
//     const updatedUser = await userModel.findOneAndUpdate(
//       { email: emailID },
//       {
//         $set: {
//           firstName: firstNameUp,
//           lastName: lastNameUp,
//           DOB: new Date(DOBUp),
//         },
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).send("User Not Found");
//     }

//     res.send(updatedUser);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // GET METHOD

// app.get("/get/:email", async (req, res) => {
//   const emailId = req.params.email;

//   try {
//     const user = await userModel.find({ email: emailId }); // Ensure you're querying by the correct field, `email` not `id`
//     if (user.length === 0) {
//       return res.status(404).send("User Not Found");
//     }
//     res.send(user);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // DELETE METHOD

// app.delete("/delete/:email", async (req, res) => {
//   const emailId = req.params.email;

//   try {
//     const user = await userModel.findOneAndDelete({ email: emailId }); // Ensure you're querying by the correct field, `email` not `id`
//     if (user == null) {
//       return res.status(404).send(`The user with ${emailId} not found.`);
//     }
//     res.status(200).send(`The user with ${emailId} has been deleted.` + user);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });
