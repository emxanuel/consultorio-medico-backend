import e from "express";
import dotenv from "dotenv";
import router from "@/routes";

const app = e();
dotenv.config();
app.use(e.json());

app.use("/api/v1", router);

app.get("/api", (req, res) => {
  res.json("Hello World!");
});

app.listen(80, () => {
  console.log("Server is running on port 80");
});