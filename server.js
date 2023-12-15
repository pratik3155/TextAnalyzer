const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const textRoutes = require("./routes/text-routes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://translator-db:X82KDUGdGr8yLGXrhy8F38gbx4TrNXnvT2T7ic95hNuCme0QHBghMrRjDMxDTxHOUWPT99f1zHPYACDbNOjxjg%3D%3D@translator-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@translator-db@", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/text", textRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
