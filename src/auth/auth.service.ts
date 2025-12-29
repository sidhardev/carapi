import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from 'src/users/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async signup(email: string, password: string) {
    const users = await this.repo.find({ where: { email } });

    if (users.length) {
      throw new BadRequestException('Email already exists');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    const user = this.repo.create({
      email,
      password: hashedPassword,
    });

    const savedUser = await this.repo.save(user);

    return {
      status: true,
      message: 'User created successfully',
      user: {
        id: savedUser.id,
        email: savedUser.email,
      },
    };
  }

  async signin(email: string, password: string) {
    const [user] = await this.repo.find({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash === hash.toString('hex')) {
      return {
        status: true,
        message: 'Signin successful',
        user: {
          id: user.id,
          email: user.email,
        },
      };
    } else {
      throw new BadRequestException('Invalid password');
    }
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id) || null;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if(attrs.password) {
    
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(attrs.password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');
      attrs.password = hashedPassword;
    }
    

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.repo.softDelete(user.id);
  }
  findAllUsers() {
    return this.repo.find();
  }
}
