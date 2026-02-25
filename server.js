import express from "express";

const app = express();

app.use(express.static('dist'));

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("App is listening on port 3000!\n");
});
