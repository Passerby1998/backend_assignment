import database from "../../database/connection.js";

const query = `
SELECT * FROM url WHERE url_id = $1 AND user_id = $2;
`;

async function viewUrl(req, res) {
  try {
    const urlId = req.params.id;
    const userId = req.user.id;
    const dbRes = await database.query(query, [urlId, userId]);
    const url = dbRes.rows[0];

    if (!url) {
      return res.status(404).json({ error: "Url not found" });
    }
    const data = {
      message: `Url viewed id ${urlId} successfully`,
      data: url,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default viewUrl;
