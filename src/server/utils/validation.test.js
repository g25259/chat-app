const {expect} = require('chai');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', (done) => {
        expect(isRealString(1)).to.be.false;
        expect(isRealString({})).to.be.false;
        expect(isRealString([])).to.be.false;
        done();
    });

    it('should reject string with only space', (done) => {
        expect(isRealString('        ')).to.be.false;
        done();
    });

    it('should accept string with non-space characters', (done) => {
        expect(isRealString('     ss   ')).to.be.true;
        done();
    });
});
