import database from "../../database/connection.js";

const query = `
SELECT click_count FROM url WHERE url_id = $1 AND user_id = $2
`;

async function analytics(req, res) {
  try {
    const urlId = req.params.id;
    const userId = req.user.id;

    const dbRes = await database.query(query, [urlId, userId]);
    const url = dbRes.rows[0];

    if (!url) {
      return res.status(400).json({ message: "Url not found" });
    }
    return res.json({ click_count: url.click_count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default analytics;
