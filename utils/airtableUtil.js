import Airtable from "airtable";
const airtableBase = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base('apppGGX0EV8PxvMIC');

export const memberTable = airtableBase("Member");
export const recieptsTable = airtableBase("Reciepts");
export const dutyTable = airtableBase("Duties");