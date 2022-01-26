import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { SignUpDto } from './signup.dto';
import { SignupService } from './signup.service';

@Controller('user-register') // http://localhost:5000/user-register
export class SignupController {
    constructor(
        private readonly signupService: SignupService
    ) { }

    @Post()
    async registerUser(@Body() signupDto: SignUpDto, @Res() res: Response) {
        const result = await this.signupService.registerUser(signupDto);
        return res.send(result);
    }
}


