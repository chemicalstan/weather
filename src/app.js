require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
// const router = express.Router
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/weather/:city", (req, res) => {
  const { city } = req.params;
  const config = {
    method: "get",
    url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${process.env.APPID}&cnt=40`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };

  return axios(config)
    .then(response => {
      console.log(response.data);
      return res.status(200).send(response.data);
    })
    .catch(err => {
      //   throw err.response.data;
      console.log(err.response.data);

      return res.status(500).send(err.response.data);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Application running on port ${process.env.PORT}`);
});
