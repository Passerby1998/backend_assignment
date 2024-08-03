import database from "../../database/connection.js";

async function redirectUrl(req, res) {
  try {
    const { shURL } = req.params;
    const result = await database.query("SELECT * FROM url WHERE sh_url = $1", [
      shURL,
    ]);
    const url = result.rows[0];

    if (!url) {
      return res.status(404).send("URL not found");
    }

    //Increment visit count to track analytics
    await database.query(
      "UPDATE url SET click_count = click_count + 1 WHERE sh_url = $1",
      [shURL]
    );

    return res.redirect(url.long_url);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default redirectUrl;
