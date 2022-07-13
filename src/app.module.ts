import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ArtistsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
