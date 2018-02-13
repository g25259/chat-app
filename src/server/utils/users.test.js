const {expect} = require('chai');

const {Users, User} = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.addUser({
            id: '1',
            name: 'Bryan',
            room: 'Node Course',
        })
        .addUser({
            id: '2',
            name: 'Vince',
            room: 'React Course',
        })
        .addUser({
            id: '3',
            name: 'Rainbow',
            room: 'Node Course',
        });
    });

    it('should add new user', () => {
        const users = new Users();
        const user = new User('123', 'Vince', 'The Office Fans');
        users.addUser(user);
        expect(users.users).to.eql([user]);
    });

    it('should remove a user', () => {
        const user = users.removeUser('2');
        expect(user).to.eql({
            id: '2',
            name: 'Vince',
            room: 'React Course',
        });
        expect(users.getUserList())
            .to.eql(['Bryan', 'Rainbow']);
    });

    it('should not remove a user', () => {
        users.removeUser('4');
        expect(users.getUserList()).to.eql(['Bryan', 'Vince', 'Rainbow']);
    });

    it('should find a user', () => {
        console.log(users.getUser('2'));
        expect(users.getUser('2')).to.equal('Vince');
    });

    it('should not find a user', () => {
        expect(users.getUserList('Node Course')).to.eql(['Bryan', 'Rainbow']);
    });

    it('should return names for node course', () => {
        expect(users.getUserList('Node Course')).to.eql(['Bryan', 'Rainbow']);
    });

    it('should return names for react course', () => {
        expect(users.getUserList('React Course')).to.eql(['Vince']);
    });
});
