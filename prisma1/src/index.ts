import { PrismaClient } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

import { userAuth } from "./middleware";
const Jwt_Screet = "chekkaNinja";
const client = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());
app.post("/signup", async (req, res) => {
  const { userName, password, firstName, lastName } = req.body;
  try {
    const response = await client.user.create({
      data: {
        userName,
        password,
        firstName,
        lastName,
      },
    });
    res.json({
      msg: "user created",
    });
  } catch (e) {
    res.json({
      msg: "problem in creating user try again",
    });
  }
});

app.post("/signin", async (req, res) => {
  const { userName, password } = req.body;
  try{
  const response = await client.user.findFirst({
    where: {
      userName: userName,
    },
  });
  const token = jwt.sign({ id: response?.id }, Jwt_Screet);
  if (response?.password === password) {
    res.json({ token: token });
  }else{
    res.json({
        msg:"invalid credentials"
    })
  }
}catch(e){
    res.json({
        msg:"some error occured, try again"
    })
}
});
app.get("/users/:id", userAuth, async (req, res) => {
  const id = req.params.id;
  try{
  const response = await client.user.findMany({
    where: {
      id: parseInt(id),
    },
  });
  res.json(response);
}catch(e){
    res.json({
        msg:"problem in finding user try aagin"
    })
}
});

app.post("/todos", userAuth, async (req, res) => {
  const { title, description } = req.body;
  const id = req.userId;

  if (id !== undefined) {
    try {
      const response = await client.todo.create({
        data: {
          title,
          description,
          done: false,
          user_id: parseInt(id),
        },
      });
      res.json({ msg: "todo created" });
    } catch (e) {
      console.log(e);
    }
  } else {
    res.json({ msg: "id is null" });
  }
});

app.get("/todos", userAuth, async (req, res) => {
  const id = req.userId;
  if (id !== undefined) {
    try{
    const response = await client.todo.findMany({
      where: {
        user_id: parseInt(id),
      },
    });
    res.json({
      response,
    });}catch(e){
        res.json({
            msg:"problem in finding todos"
        })
    }
  } else {
    res.json({
      msg: "user_id is null",
    });
  }
});

app.put("/todos/:id", userAuth, async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const { title, description, done } = req.body;
  if (userId !== undefined) {
    const response = await client.todo.update({
      where: {
        user_id: parseInt(userId),
        id: parseInt(id),
      },
      data: {
        title: title,
        description: description,
        done: done,
      },
    });
    res.json({
      msg: "todo updated",
    });
    console.log("edit called");
  } else {
    res.json({
      msg: "id is undefined",
    });
  }
});

app.put("/done/:id", userAuth, async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const done = req.body.done;
  if (userId !== undefined) {
    const response = await client.todo.update({
      where: {
        user_id: parseInt(userId),
        id: parseInt(id),
      },
      data: {
        done: done,
      },
    });
    console.log("done called" + id, userId, done);
    res.json({
      msg: "todo done",
    });
  } else {
    res.json({
      msg: "id is undefined",
    });
  }
});

app.delete("/delete/:id", userAuth, async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  if (userId !== undefined) {
    const response = await client.todo.delete({
      where: {
        user_id: parseInt(userId),
        id: parseInt(id),
      },
    });
    res.json({
      msg: "todo deleted",
    });
    console.log(id);
  } else {
    res.json({
      msg: "id is undefined",
    });
  }
});

app.listen(3000);
