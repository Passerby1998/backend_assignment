import database from "../../database/connection.js";

const query = `
SELECT url_id, sh_url, long_url FROM url WHERE user_id = $1
`;

async function listUrls(req, res) {
  try {
    const createdBy = req.user.id;
    const dbRes = await database.query(query, [createdBy]);
    const urls = dbRes.rows;
    const data = {
      message: "Urls listed succesfully",
      data: urls,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default listUrls;
