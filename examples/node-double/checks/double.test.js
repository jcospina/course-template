module.exports = ({test,assert}) => {
 const {double} = require('../index.js');
 test('positive input', () => assert.strictEqual(double(3), 6));
 test('zero input', () => assert.strictEqual(double(0), 0));
 test('negative input', () => assert.strictEqual(double(-3), -6));
};
