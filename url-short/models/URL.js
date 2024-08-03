import database from "../database/connection.js";

const createURLTableSQL = `
CREATE TABLE IF NOT EXISTS url (
    url_id serial PRIMARY KEY,
    long_url varchar(255),
    sh_url varchar(255) UNIQUE,
    user_id integer REFERENCES users(id),
    click_count integer DEFAULT 0,
    creation_date timestamp DEFAULT NOW()
);
`;

async function createURLTable() {
  try {
    await database.query(createURLTableSQL);
    console.log("URL table created");
  } catch (error) {
    return console.log("Error creating URL table", error);
  }
}

export default createURLTable;
