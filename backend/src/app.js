const express = require("express");
const cors = require("cors");
const setupSwagger = require("./swagger");
const todoRouter = require("./routes/todo.route");

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

// 라우터
app.use("/api", todoRouter);

// 서버 시작
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
