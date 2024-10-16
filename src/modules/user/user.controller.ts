import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { UpdateUserDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Body() updateDTO: UpdateUserDTO,
    @Req() request,
  ): Promise<UpdateUserDTO> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDTO);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.user;
    return this.userService.deleteUser(user.email);
  }
}
