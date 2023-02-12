import dotenv from "dotenv";
import path from 'path';

/**
 * @see https://velog.io/@public_danuel/process-env-on-node-js
 */
const dirname = path.resolve();
if (process.env.NODE_ENV === 'local') {
    dotenv.config({ path: path.join(dirname, '/.env.local') })
} else {
  throw new Error('process.env.NODE_ENV를 설정하지 않았습니다!')
}

export const config = {
  notion: {
    NOTION_API_KEY_KEYWORD_NOTE: process.env.NOTION_API_KEY_KEYWORD_NOTE,
    NOTION_DB_ID_KEYWORD_NOTE: process.env.NOTION_DB_ID_KEYWORD_NOTE,
  },
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS,
  }
}