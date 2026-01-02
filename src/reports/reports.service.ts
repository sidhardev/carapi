import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reports } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { CreateReportDto } from './dtos/create-reports.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Reports) private repo: Repository<Reports>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  getReportsByUserId(userid: number) {
    return this.repo.find({
      where: {
        user: { id: userid },
      },
      relations: ['user'],
    });
  }

  getReports() {
    return this.repo.find();
  }
  updateReports(id: number, attrs:UpdateReportDto) {
    return this.repo.update(id, attrs);
  }
}
