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

  const { newUser, error } = reserveUsername(username as string);

  if (error) return res.json({ username: newUser, message: error });

  res.json({ username: newUser, message: "user has successfully joined the chat" });
});

export default router;
