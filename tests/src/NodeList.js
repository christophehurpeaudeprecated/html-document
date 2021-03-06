/* global test */
import assert from 'proclaim';

const lib = '../../lib/';

const Document = require(lib + 'Document');
const NodeList = require(lib + 'NodeList');

test('NodeList items', () => {
    const document = new Document();
    const div = document.createElement('div');

    const nodeList = new NodeList();

    assert.strictEqual(nodeList.length, 0);
    nodeList._push(div);
    assert.strictEqual(nodeList.length, 1);

    assert.strictEqual(nodeList[0], div);
    assert.strictEqual(nodeList[1], undefined);

    assert.strictEqual(nodeList.item(0), div);
    assert.strictEqual(nodeList.item(1), null);
});

test('NodeList iterator', () => {
    const document = new Document();
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');

    const nodeList = new NodeList();

    nodeList._push(div1);
    nodeList._push(div2);

    assert.strictEqual(nodeList[0], div1);
    assert.strictEqual(nodeList[1], div2);

    let index = 0;
    for (let item of nodeList) {
        if (index++ == 0) {
            assert.strictEqual(item, div1);
        } else {
            assert.strictEqual(item, div2);
        }
    }

    assert.strictEqual(index, 2);
});
