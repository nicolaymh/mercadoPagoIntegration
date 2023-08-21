import { Router } from "express";
import { createOrder, success, receiveWebhook } from "../controllers/paymment.controller.js";

const router = Router();

router.post("/create-order", createOrder);
router.get("/success", success);
router.get("/failure", (req, res) => res.send("failure"));
router.get("/pending", (req, res) => res.send("pending"));
router.post("/webhook", receiveWebhook);

export default router;
