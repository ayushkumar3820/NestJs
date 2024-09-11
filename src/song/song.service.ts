import { Injectable } from '@nestjs/common'
import { CreateSongDto } from './dto/create-song-tdo'

@Injectable()
export class SongService {
  [x: string]: any
  // Local DB (Array for now)
  private readonly songs: CreateSongDto[] = []

  create(song: CreateSongDto) {
    // Save the song in the database
    this.songs.push(song)
    return song
  }

  findAll() {
    // Fetch all songs from the db
    return this.songs
  }
}
