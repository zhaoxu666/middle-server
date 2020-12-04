export default class User {

    username: String;
    name: String;
    email: String;
    id: Number

    constructor(name: String, username: String, email: String, id: Number) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.id = id
    }

    getUsername() {
        return this.username;
    }
    getName() {
        return this.name;
    }
}