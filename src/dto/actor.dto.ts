import { IsString, IsUrl, IsNotEmpty, IsNumber } from 'class-validator';
import { Url } from 'url';

export class ActorDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number = 0;

  @IsString()
  @IsNotEmpty()
  readonly login: string = '';

  @IsUrl()
  @IsNotEmpty()
  readonly avatar_url!: Url;
}
