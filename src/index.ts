import e from "express";
import dotenv from "dotenv";

const app = e();
dotenv.config();
app.use(e.json());

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(80, () => {
  console.log("Server is running on port 80");
});