import mongoose from "mongoose";
export const connectdb=()=>{
mongoose
  .connect(process.env .MONGO_URI, {
    dbName: "backendapi",
  })
  .then((c) => console.log('Database Connected TO ',c.connection.host))
  .catch((e) => console.log(e));
}