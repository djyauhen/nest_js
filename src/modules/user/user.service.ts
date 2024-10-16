import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModelRepository: typeof UserModel,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return await this.userModelRepository.findOne({
      where: { email: email },
    });
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    await this.userModelRepository.create({
      firstname: dto.firstname,
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });
    return dto;
  }

  async publicUser(email: string) {
    return await this.userModelRepository.findOne({
      where: { email: email },
      attributes: { exclude: ['password'] },
    });
  }

  async updateUser(email: string, dto: UpdateUserDTO) {
    await this.userModelRepository.update(dto, { where: { email } });
    return dto;
  }

  async deleteUser(email: string) {
    await this.userModelRepository.destroy({ where: { email } });
    return true;
  }
}
