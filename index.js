const express = require("express");
const cors = require("cors");
const usersCollection = require("./config");
const app = express();
app.use(cors());
app.use(express.json());

//get all users and id
app.get("/api/v1/users", async (req, res) => {
    try {
        const users = await usersCollection.get();
        const usersArray = [];
        users.forEach((doc) => {
            usersArray.push({ id: doc.id, ...doc.data() });
        });
        const fs = require("fs");
        fs.writeFile("users.json", JSON.stringify(usersArray, null, 2), (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.status(200).json(usersArray);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//create a user
app.post("/api/v1/users", async (req, res) => {
    try {
        const user = await usersCollection.add(req.body);
        res.status(201).json({ id: user.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    })

//get single user
app.get("/api/v1/users/:id", async (req, res) => {
    try {
        const user = await usersCollection.doc(req.params.id).get();
        if (!user.exists) {
        res.status(404).json({ error: "User not found" });
        return;
        }
        res.status(200).json({ id: user.id, ...user.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    })

//update a user
app.put("/api/v1/users/:id", async (req, res) => {
    try {
        const user = await usersCollection.doc(req.params.id).get();
        if (!user.exists) {
        res.status(404).json({ error: "User not found" });
        return;
        }
        await usersCollection.doc(req.params.id).update(req.body);
        res.status(200).json({ id: user.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    })

//delete a user
app.delete("/api/v1/users/:id", async (req, res) => {
    try {
        const user = await usersCollection.doc(req.params.id).get();
        if (!user.exists) {
        res.status(404).json({ error: "User not found" });
        return;
        }
        await usersCollection.doc(req.params.id).delete();
        res.status(200).json({ id: user.id, ...user.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    })

app.listen(4000, () => {
    console.log("Server is running on port 4000");
    })