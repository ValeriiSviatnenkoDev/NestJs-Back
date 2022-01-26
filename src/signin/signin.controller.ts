import { Body, Controller, Post, Res, Logger } from '@nestjs/common';
import { Response } from 'express';

import { SignInDto } from './signin.dto';
import { SigninService } from './signin.service';

@Controller('user-login') // http://localhost:5000/user-login
export class SigninController {
    constructor( 
        private readonly singinService: SigninService
    ) { }

    @Post()
    async loginUser(@Body() signinDto: SignInDto, @Res() res: Response) {
        const result = await this.singinService.loginUser(signinDto);
        return res.send(result);
    }
}
