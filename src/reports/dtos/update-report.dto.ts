import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
  IsOptional,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReportDto {
  @ApiPropertyOptional({
    example: 'Toyota',
    description: 'The make of the car',
  })
  @IsOptional()
  @IsString()
  make?: string;

  @ApiPropertyOptional({
    example: 'Corolla',
    description: 'The model of the car',
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({
    example: 2020,
    description: 'The year of the car',
  })
  @IsOptional()
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year?: number;

  @ApiPropertyOptional({
    example: 15000,
    description: 'The mileage of the car',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100000)
  mileage?: number;

  @ApiPropertyOptional({
    example: 35000,
    description: 'The price of the car',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: 34.0,
    description: 'The latitude of the car location',
  })
  @IsOptional()
  @IsLatitude()
  lat?: number;

  @ApiPropertyOptional({
    example: -118.0,
    description: 'The longitude of the car location',
  })
  @IsOptional()
  @IsLongitude()
  lng?: number;
}
