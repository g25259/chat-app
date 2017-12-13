require('chai').should();
const { expect } = require('chai');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        const from = 'vince';
        const text = 'hello';
        const res = generateMessage(from, text);
        // res.from.should.equal(from);
        // res.text.should.equal(text);
        // res.createdAt.should.be.a('Date');
        expect(res).to.include({ from, text });
        expect(res.createdAt).to.be.a('number');
        done();
    });
});
