import app from "./app";

const PORT = 5000;

app.listen(PORT, ()=> {
  console.log(`REST API server ready at: http://localhost:${PORT}`)
})