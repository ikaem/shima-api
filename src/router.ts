import { Router } from "express";
import { reserveUsername } from "./socket-io/rooms";

const router = Router();

router.get("/", async (req, res) => {
  res.json("this is get");
});
router.post("/join", async (req, res) => {
  const {
    body: { username },
  } = req;

  console.log("username this", username)

  const { newUser, error } = reserveUsername(username as string);

  console.log( newUser)

  if (error) return res.json({ username, message: error });

  res.json({ username, message: "user has successfully joined the chat" });
});

export default router;
