import {
  IsString,
  ValidateNested,
  IsNotEmptyObject,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { RepoDto } from './repo.dto';
import { ActorDto } from './actor.dto';

export class EventDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number = 0;

  @IsString()
  readonly type: string = '';

  @ValidateNested()
  @IsNotEmptyObject()
  readonly actor!: ActorDto;

  @ValidateNested()
  @IsNotEmptyObject()
  readonly repo!: RepoDto;
}

export class EventResponseDTO {
  id!: number;
  type!: string;
  actor!: {
    id: number;
    login: string;
    avatar_url: string;
  };
  repo!: {
    id: number;
    name: string;
    url: string;
  };
  created_at?: string;
}
