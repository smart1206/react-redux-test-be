import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from 'node-fetch'

const app = express();

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));

// parse json request body
app.use(bodyParser.json());

// enable cors
app.use(cors({
  origin: "*",
  methods: "post",
  optionsSuccessStatus: 200
}));

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '5000');

app.listen(port, (error) => {
  if (error) { //handle error
    throw new Error(error);
  }
  console.log("Backend is running", port);
});

/*
  return back all the user information
*/
app.get("/getUserInfos", async (req, res) => {
  try {
    const resp = await fetch(
      `http://jsonplaceholder.typicode.com/posts`,
      {
        method: 'GET'
      }
    );
    const data = await resp.json();

    // return response
    res.status(200).send({ success: true, result: data });
  } catch (err) { // error handling
    res.status(200).send({ success: false });
    console.log(err)
    return;
  }
})

/*
  return back one user information by id
*/
app.get("/getUserInfo", async (req, res) => {
  try {
    const resp = await fetch(
      `http://jsonplaceholder.typicode.com/posts`,
      {
        method: 'GET'
      }
    );
    const data = await resp.json();

    const filter = data.find(elem => elem.id == req.query["id"]);

    // return response
    res.status(200).send({ success: true, result: filter });
  } catch (err) { // error handling
    res.status(200).send({ success: false });
    console.log(err)
    return;
  }
})