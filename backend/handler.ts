import serverless from "serverless-http";
import express from "express";
import { router } from "./src/routes/router";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

exports.handler = serverless(app);
