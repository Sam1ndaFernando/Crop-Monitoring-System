export class UserModel {
    constructor(email, password, role) {
        this.Email = email;
        this.Password = password;
        this.Role = role;
    }

    // Getter and Setter for Email
    getEmail() {
        return this.Email;
    }

    setEmail(email) {
        this.Email = email;
    }

    // Getter and Setter for Password
    getPassword() {
        return this.Password;
    }

    setPassword(password) {
        this.Password = password;
    }

    // Getter and Setter for Role
    getRole() {
        return this.Role;
    }

    setRole(role) {
        this.Role = role;
    }
}
