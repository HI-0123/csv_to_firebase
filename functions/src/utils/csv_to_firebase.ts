import { db } from "../firebase";
import * as functions from "firebase-functions";
import * as fs from "fs";
import { parse } from "csv-parse/sync";

const csv = fs.readFileSync("./src/csv/test.csv");
const records = parse(csv, { columns: true });

export const csvToFirebase = functions
  .region("asia-northeast1")
  .https.onRequest(() => {
    records.forEach(async (record: any) => {
      try {
      const collectionRef = db.
        collection("test")
        .doc("v1")
        .collection("master");
        const id = collectionRef.doc().id;
        const data = { ...record, id: id };
      await collectionRef.doc(id).set(data);
    } catch (error) {
      console.log(error);
    }
    });
    return Promise.resolve();
});
