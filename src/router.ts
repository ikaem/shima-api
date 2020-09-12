import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    res.json("this is get");
})

export default router;