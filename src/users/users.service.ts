import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }
    create(email: string, password: string) {
        const user = this.repo.create({email, password});
         const saved = this.repo.save(user);
         return saved;
    }
    findOne(id: number) {
        const user = this.repo.findOneBy({id}); 
        return user;  
    }
    find(email: string) {
        const userByEmails = this.repo.find({where: {email}});
        return userByEmails;
    }
     
    async update(id: number, attrs: Partial<User>) {
  const user = await this.findOne(id);

  if(!user){
    throw new NotFoundException('user not found');
  }
  Object.assign(user, attrs);
  return this.repo.save(user);
}
async remove(id: number) {
    const user = await this.findOne(id);

  if(!user){
    throw new NotFoundException('user not found'); 
  }
  return this.repo.remove(user);
}


}
