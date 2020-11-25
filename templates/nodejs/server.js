import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.options('/locations', cors());
app.options('/locations/:country', cors());

app.get('/hello', cors(), (req, res) => {
  res.json({ "code": 200, "msg": "hello world" })
});

app.get('/hello/:name', cors(), (req, res) => {
  res.json({ "code": 200, "msg": `Well, hello ${req.params.name}` })
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
