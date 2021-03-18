import { Body, Query, Controller, Get, Post, Res } from '@nestjs/common';
import { sign } from 'node:crypto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/nonce')
  getNonce(@Query('publicAddress') publicAddress: string) {
    return this.userService.getNonce(publicAddress);
  }

  @Post('/auth')
  async verifySignature(
    @Res() response,
    @Body('signature') signature,
    @Body('publicAddress') publicAddress,
  ) {
    if (!(signature && publicAddress)) {
      return response.status(400).send({
        error: {
          msg: 'Please send both signature and public address',
        },
      });
    }
    const res = await this.userService.verifySignature(publicAddress,signature);
    console.log(res)
    return response.send(res) 
  }
}
