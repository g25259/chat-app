require('chai').should();
const {expect} = require('chai');

const {generateMessage} = require('./message');
const {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        const from = 'vince';
        const text = 'hello';
        const res = generateMessage(from, text);
        // res.from.should.equal(from);
        // res.text.should.equal(text);
        // res.createdAt.should.be.a('Date');
        expect(res).to.include({from, text});
        expect(res.createdAt).to.be.a('number');
        done();
    });
});

describe('generageLocationMessage', () => {
    it('should generate correct location message', (done) => {
        const from = 'admin';
        const latitude = '';
        const longitude = '';

        const res = generateLocationMessage(from, latitude, longitude);

        expect(res.from).equal(from);
        expect(res.url).equal(`https://www.google.com/maps?q=${latitude},${longitude}`);
        done();
    });
});
