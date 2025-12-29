import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";
import { Type } from 'class-transformer';
export class CreateReportDto {
    id: number;
    @Type(() => User)
    user: User;
  @ApiProperty({
    example: 'Toyota',
    description: 'The make of the car',
  })
  @IsString()
  make: string;

  @ApiProperty({
    example: 'Corolla',
    description: 'The model of the car',
  })
  @IsString()
  model: string;

  @ApiProperty({
    example: 2020,
    description: 'The year of the car',
  })
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @ApiProperty({
    example: 15000,
    description: 'The mileage of the car',
  })
  @IsNumber()
  @Min(0)
  @Max(100000)
  mileage: number;

  @ApiProperty({
    example: 35000,
    description: 'The price of the car',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 34.0,
    description: 'The latitude of the car location',
  })
@IsLatitude()

lat: number;

  @ApiProperty({
    example: -118.0,
    description: 'The longitude of the car location',
  })
@IsLongitude()
  lng: number;

}