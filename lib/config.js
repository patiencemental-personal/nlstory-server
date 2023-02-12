import dotenv from "dotenv";
dotenv.config();

export const config = {
  notion: {
    NOTION_API_KEY_KEYWORD_NOTE: process.env.NOTION_API_KEY_KEYWORD_NOTE,
    NOTION_DB_ID_KEYWORD_NOTE: process.env.NOTION_DB_ID_KEYWORD_NOTE,
  }
}