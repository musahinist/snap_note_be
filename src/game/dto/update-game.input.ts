import { CreateGameInput } from './create-game.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGameInput extends PartialType(CreateGameInput) {
  id: number;
}
