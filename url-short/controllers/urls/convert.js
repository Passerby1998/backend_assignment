import { nanoid } from "nanoid";
import database from "../../database/connection.js";

const query = `
INSERT INTO url (sh_url, long_url, user_id)
VALUES ($1, $2, $3)
RETURNING url_id, sh_url, long_url, creation_date, user_id;
`;

async function createURL(req, res) {
  try {
    const { long_url } = req.body;
    if (!long_url) {
      return res.status(400).json({ error: "URL is required" });
    }
    // mid
    const user_id = req.user.id;
    const shURL = nanoid(8);

    const values = [shURL, long_url, user_id];

    const dbRes = await database.query(query, values);
    const URL = dbRes.rows[0];
    const data = {
      message: "URL shortened successfully",
      data: URL,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default createURL;
