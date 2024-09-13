import express from "express";
import { allNews, breakingNews, categories } from "../controllers/news.controller.js";

const router = express.Router()

router.get('/breakingnews',breakingNews)
router.get('/news',allNews)
router.get('/category',categories)
export default router