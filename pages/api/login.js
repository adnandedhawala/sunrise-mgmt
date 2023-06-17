// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { memberTable } from "../../utils/airtableUtil";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;
    if (!data) return res.status(400).end("login data is missing!");
    if (!data.its) return res.status(400).end("login data is missing!");
    const memberData = await memberTable.select({
      view: "Website View",
      filterByFormula: `({its} = '${data.its}')`,
    })
      .firstPage();

    if (!memberData.length) {
      return res.status(400).end("User not found!");
    } else {
      const userData = { ...memberData[0].fields, id: memberData[0].id }
      if (userData["Member Status"] !== "APPROVED") {
        return res.status(401).end("User not found!");
      } else {
        const authToken = sign(
          userData,
          process.env.NEXT_PUBLIC_ACCESS_TOKEN_SALT,
          {
            expiresIn: "8h"
          }
        )
        return res.status(200).send({ data: authToken });
      }
    }
  } else {
    return res.status(404).end("API not found")
  }



}
