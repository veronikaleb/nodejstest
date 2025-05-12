import { BaseRepository } from "./baseRepository.js";
import fs from 'fs';
import path from 'path';

class UserRepository extends BaseRepository {
  constructor() {
    super("users");
    this.dbPath = path.join(__dirname, '../config/database.json');
    this._load();
  }

  _load() {
    const data = fs.readFileSync(this.dbPath);
    this.db = JSON.parse(data);
    if (!this.db.users) this.db.users = [];
  }

  _save() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.db, null, 2));
  }

  getAll() {
    return this.db.users;
  }

  getById(id) {
    return this.db.users.find(user => user.id === id);
  }

  findByEmail(email) {
    return this.db.users.find(user => user.email === email);
  }

  findByPhone(phone) {
    return this.db.users.find(user => user.phone === phone);
  }

  create(user) {
    this.db.users.push(user);
    this._save();
    return user;
  }

  update(id, data) {
    const index = this.db.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    this.db.users[index] = { ...this.db.users[index], ...data };
    this._save();
    return this.db.users[index];
  }

  delete(id) {
    const index = this.db.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    const removed = this.db.users.splice(index, 1)[0];
    this._save();
    return removed;
  }

  getOne(search) {
    return this.db.users.find(user => user.email === search || user.phone === search);
  }
}

const userRepository = new UserRepository();

export { userRepository };
