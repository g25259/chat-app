/**
 * @class User
 */
class User {
    /**
     * Creates an instance of User.
     * @param {string} id
     * @param {string} name
     * @param {string} room
     * @memberof User
     */
    constructor(id, name, room) {
        Object.assign(this, {id, name, room});
    }
}


/**
 * @class User
 */
class Users {
    /**
     * Creates an instance of Users.
     */
    constructor() {
        this.users = [];
    }

    /**
     * Add a user into users.
     *
     * @param {User} user
     * @return {Users} this
     * @memberof Users
     */
    addUser(user) {
        this.users.push(user);
        return this;
    }

    /**
     * Remove user according to id.
     *
     * @param {string} id
     * @return {User} removed user
     * @memberof Users
     */
    removeUser(id) {
        let removedUser;
        this.users = this.users.filter((user) => {
            if (user.id === id) {
                removedUser = user;
                return false;
            }
            return true;
        });
        return removedUser;
    }

    /**
     * Get user name according to id.
     *
     * @param {any} id
     * @return {string} Name of Retrived User.
     * @memberof Users
     */
    getUser(id) {
        const user = this.users.find((user) => user.id === id);
        if (user) {
            return user.name;
        }
        return '';
    }

    /**
     * Get array of user which are in room {room}.
     *
     * @param {string} room
     * @return {array} array of name of User
     * @memberof Users
     */
    getUserList(room) {
        if (room) {
            return this.users.filter((user) => user.room === room)
                .map((user) => user.name);
        }

        return this.users.map((user) => user.name);
    }
}

module.exports = {Users, User};
