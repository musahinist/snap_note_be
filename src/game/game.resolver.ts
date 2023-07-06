import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GameService } from './game.service';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';

@Resolver('Game')
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Mutation('createGame')
  create(@Args('createGameInput') createGameInput: CreateGameInput) {
    return this.gameService.create(createGameInput);
  }

  @Query('game')
  findAll() {
    return this.gameService.findAll();
  }

  @Query('game')
  findOne(@Args('id') id: number) {
    return this.gameService.findOne(id);
  }

  @Mutation('updateGame')
  update(@Args('updateGameInput') updateGameInput: UpdateGameInput) {
    return this.gameService.update(updateGameInput.id, updateGameInput);
  }

  @Mutation('removeGame')
  remove(@Args('id') id: number) {
    return this.gameService.remove(id);
  }
}
