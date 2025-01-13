import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public-strategy';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UsersService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userService: UsersService,
    private configService: ConfigService, // Inject ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET'); // Get secret dynamically
      const payload = await this.jwtService.verifyAsync(token, { secret });

      // Assign the payload to the request object
      request['user'] = payload;

      // Check if the user exists and is active using cache or DB
      const user = await this.getUserFromCacheOrDB(payload.id);
      if (!user.isActive) {
        throw new UnauthorizedException('User is not active.');
      }

      request['userDetails'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  // Method to get user from cache or database
  private async getUserFromCacheOrDB(userId: number): Promise<any> {
    // Check if the user object is cached
    const cachedUser = await this.cacheManager.get<any>(`user:${userId}`);
    if (cachedUser) {
      return cachedUser;
    }

    // If not cached, fetch from the database
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    // Cache the user object in Redis with an expiration time (e.g., 10 minutes)
    await this.cacheManager.set(`user:${userId}`, user, this.configService.get<number>('CACHE_TTL'));

    return user;
  }
}
