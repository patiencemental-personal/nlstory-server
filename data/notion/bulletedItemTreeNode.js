import * as keywordNoteNotionClient from '../../api/keywordNoteNotionClient.js';

export default class BulletedItemTreeNode {
  static async buildTreeRecursivePreOrder(node) {
    if (node.hasChildren()) {
      const blockId = node.getBlockId();
      const response = await keywordNoteNotionClient.getBlocks(blockId);
      const childBlocks = response.results;
      for (let i = 0; i < childBlocks.length; i++) {
        const childNode = new BulletedItemTreeNode(childBlocks[i]);
        node.addChild(childNode);
        await BulletedItemTreeNode.buildTreeRecursivePreOrder(childNode);
      }
    }
  }

  static printTreeRecursivePreOrder(node) {
    node.print();
    node.children.forEach((childNode) => BulletedItemTreeNode.printTreeRecursivePreOrder(childNode))
  }

  constructor(block) {
    this.block = block;
    this.text = block.bulleted_list_item?.rich_text[0].plain_text
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }

  print() {
    console.log(this.text);
  }

  hasChildren() {
    return this.block.has_children;
  }

  getBlockId() {
    return this.block.id;
  }
}