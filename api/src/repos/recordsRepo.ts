import { Record, RecordDetails } from "../models/record";
import { bookkeepingDB } from "../services/mongo";

export const RECORDS_COLLECTION = "records";

const recordsCol = bookkeepingDB.collection(RECORDS_COLLECTION);

export async function createRecord(r: RecordDetails): Promise<Record> {
  const res = await recordsCol.insertOne(r);

  return {
    id: res.insertedId.toHexString(),
    details: r,
  };
}

export async function fetchRecord(recordName: string): Promise<Record | null> {
  const query = {
    name: recordName,
  };

  const qRes = await recordsCol.findOne<RecordDetails>(query);

  if (qRes) {
    return {
      id: qRes._id?.toHexString(),
      details: {
        name: qRes.name,
        description: qRes.description,
      },
    };
  } else {
    return qRes;
  }
}
