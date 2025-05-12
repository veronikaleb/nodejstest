import { v4 as uuid } from 'uuid';
import { userRepository } from '../repositories/userRepository.js';

class UserService {
  getAll() {
    return userRepository.getAll();
  }

  getById(id) {
    return userRepository.getById(id);
  }

  create(data) {
    if (userRepository.findByEmail(data.email)) {
      throw new Error('Email already exists');
    }
    if (userRepository.findByPhone(data.phone)) {
      throw new Error('Phone already exists');
    }
    
    const newUser = { ...data, id: uuid() };
    return userRepository.create(newUser);
  }

  update(id, data) {
    const existing = userRepository.getById(id);
    if (!existing) throw new Error('User not found');
    
    return userRepository.update(id, data);
  }

  delete(id) {
    const removed = userRepository.delete(id);
    if (!removed) throw new Error('User not found');
    return removed;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };

