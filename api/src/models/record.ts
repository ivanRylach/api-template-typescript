import { Document, ObjectId } from "mongodb";

export interface Record {
  id?: string;
  details: RecordDetails;
}

export interface RecordDetails {
  _id?: ObjectId;
  name: string;
  description: string;
}
