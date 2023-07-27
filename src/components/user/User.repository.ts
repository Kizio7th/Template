import dataSource from "../../services/db/dataSource";
import { User } from "./User.entity";
import bcrypt from "bcrypt";

export const UserRepository = dataSource.getRepository(User).extend({
  async findByEmail(email) {
    return await this.findOne({ where: { email: email } });
  },
  async addUser(name:string, email:string, password:string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return this.save({
        name: name,
        email: email,
        password: hashedPassword,
      });
    } catch (error) {
      console.error(error);
    }
  },
  async verification(email:string, password:string) {
    const user = await this.findByEmail(email);
    if (!user) return false;
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return false;
  }
})
