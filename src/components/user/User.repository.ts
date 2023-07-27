import dataSource from "../../services/db/dataSource";
import { User } from "./User.entity";
import bcrypt from "bcrypt";
const userRepository = dataSource.getRepository(User);

export class UserService {
  async findByGmail(gmail) {
    return await userRepository.findOne({ where: { gmail: gmail } });
  }
  async createUser(name, gmail, password) {
    return userRepository.save({
      name: name,
      gmail: gmail,
      password: await bcrypt.hash(password, 10),
    });
  }
  async login(gmail, password) {
    const user = this.findByGmail(gmail);
    if (!user) return false;
    if (bcrypt.compare(password, (await user).password)) {
      return user;
    }
    return false;
  }
}
