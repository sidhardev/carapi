import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-reports.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Reports } from './reports.entity';
import { ApiParam } from '@nestjs/swagger';
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
  @Get()
  getReports() {
    return this.reportsService.getReports();
  }

  @Get('/user/:id')
  getReportsByUser(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.reportsService.getReportsByUserId(id);
  }
}
