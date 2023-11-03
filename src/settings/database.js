import { connect } from "mongoose";
import { config } from "./config.js";

export const startConnection = async () => {
  try {
    const db = await connect(config.mongo_uri, {
      dbName: "prueba-1",
    });
    console.log("Database is connected to:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
};
