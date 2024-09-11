import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common'
import { SongService } from './song.service'
import { CreateSongDto } from './dto/create-song-tdo'

@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto)
  }

  @Get()
  findAll() {
    try {
      return this.songService.findAll()
    } catch (e) {
      throw new HttpException(
        'Failed to fetch songs',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      )
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    try {
      return this.songService.findOne(id)
    } catch (e) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND, {
        cause: e,
      })
    }
  }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDto: CreateSongDto,
  ) {
    try {
      return this.songService.update(id, updateSongDto)
    } catch (e) {
      throw new HttpException('Failed to update song', HttpStatus.BAD_REQUEST, {
        cause: e,
      })
    }
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    try {
      return this.songService.delete(id)
    } catch (e) {
      throw new HttpException('Failed to delete song', HttpStatus.BAD_REQUEST, {
        cause: e,
      })
    }
  }
}
