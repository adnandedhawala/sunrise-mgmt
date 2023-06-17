// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { recieptsTable } from "../../utils/airtableUtil";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { data } = req.body;
        if (!data) return res.status(400).end("data is missing!");
        if (!data.reciepts) return res.status(400).end("data is missing!");
        const finalData = [];
        await recieptsTable.select({
            view: "Grid view",
            filterByFormula: `OR(${data.reciepts.map(id => `RECORD_ID() = '${id}'`).join(',')})`,
        }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function (record) {
                finalData.push({ ...record.fields, id: record.id });
            });

            fetchNextPage();

        }, function done(err) {
            if (err) {
                return res.status(500).send("Error in fetching data!")
            }
            return res.status(200).send({ data: finalData })
        });


    } else if (req.method === 'GET') {
        const { recieptId } = req.query;
        if (!recieptId) return res.status(400).end("data is missing!");
        recieptsTable.find(recieptId, function (err, record) {
            if (err) {
                return res.status(500).send("Error in fetching data!")
            }
            return res.status(200).send({ data: {...record.fields} })
        })
    } else {
        return res.status(404).end("API not found")
    }



}
