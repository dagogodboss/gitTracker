import { IsUrl, IsString, IsNumber } from 'class-validator';
import { Url } from 'url';

export class RepoDto {
  @IsNumber()
  readonly id: number = 0;

  @IsString()
  readonly name: string = '';

  @IsUrl()
  readonly url!: Url;
}
