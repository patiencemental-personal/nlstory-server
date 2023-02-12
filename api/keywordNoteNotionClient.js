import { Client } from "@notionhq/client";
import { config } from "../lib/config.js";

/**
 * @see https://developers.notion.com/reference/intro
 */
const notion = new Client({ auth: config.notion.NOTION_API_KEY_KEYWORD_NOTE });
const databaseId = config.notion.NOTION_DB_ID_KEYWORD_NOTE;

export async function getPages(filter, sorts) {
  const params = { database_id: databaseId };
  if (filter) params['filter'] = filter;
  if (sorts) params['sorts'] = sorts;
  return  await notion.databases.query(params);
}

export async function getBlocks(blockId) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  return response;
}

export async function updatePageProperties(pageId, properties) {
  const response = await notion.pages.update({
    page_id: pageId,
    properties,
  });
  return response;
}