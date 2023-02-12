import * as keywordNoteNotionClient from '../api/keywordNoteNotionClient.js';
import { format } from 'date-fns';
import BulletedItemTreeNode from '../data/notion/bulletedItemTreeNode.js';

/**
 * 오늘 공부해야 할 키워드 노트 리스트 조회
 * @return {Array} 페이지(키워드 노트)들의 id, properties들을 반환한다
 */
export async function getDailyKeywordNote(req, res) {
  const formatedToday = format(new Date(), 'yyyy-MM-dd');
  const filter = {
    and: [
      { property: 'studying', checkbox: { equals: true, }, },
      { property: 'nextReviewDate', date: { on_or_before: formatedToday, }, },
    ],
  };
  const sorts = [
    { property: 'topic', direction: 'ascending', },
    { property: 'reviewCnt', direction: 'ascending', },
    { property: 'difficulty', direction: 'ascending', },
    { property: 'title', direction: 'ascending', },
  ];
  const response = await keywordNoteNotionClient.getPages(filter, sorts);
  const pages = response.results.map(({ id, properties }) => { return { id, properties }; });
  res.status(200).json(pages);
}


/**
 * 개별 페이지(키워드 노트) 상세 조회
 */
export async function getKeywordNoteDetail(req, res) {
  const { pageId } = req.params;
  const response = await keywordNoteNotionClient.getBlocks(pageId);
  const pageContentBlocks = response.results;
  
  const BULLETED_ITEM_KEY = {
    KEYWORD: 'Keyword',
    OUTPUT_GUIDE: 'Output Guide',
    REFERENCE_LINKS: 'Reference Links',
  };

  const keyBlockTreeRootNodeMap = {
    [BULLETED_ITEM_KEY.KEYWORD]: null,
    [BULLETED_ITEM_KEY.OUTPUT_GUIDE]: null,
    [BULLETED_ITEM_KEY.REFERENCE_LINKS]: null,
  };

  pageContentBlocks.forEach((block) => {
    const newNode = new BulletedItemTreeNode(block);
    if (newNode.text && keyBlockTreeRootNodeMap.hasOwnProperty(newNode.text)) {
      keyBlockTreeRootNodeMap[newNode.text] = newNode;
    }
  });

  for (const [key, rootNode] of Object.entries(keyBlockTreeRootNodeMap)) {
    await BulletedItemTreeNode.buildTreeRecursivePreOrder(rootNode);
    BulletedItemTreeNode.printTreeRecursivePreOrder(rootNode);  
  }
  
  res.status(200).json(keyBlockTreeRootNodeMap);
}


/**
 * 개별 페이지(키워드 노트) 프로퍼티 수정
 */
export async function updateKeywordNoteProperties(req, res) {
  const { pageId } = req.params;
  const { properties } = req.body;
  const response = await keywordNoteNotionClient.updatePageProperties(pageId, properties);
  res.status(200).json(response)
}