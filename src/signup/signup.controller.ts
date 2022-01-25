import { Body, Controller, Post, Req } from '@nestjs/common';

import { SignUpDto } from './signup.dto';
import { SignupService } from './signup.service';

@Controller('user-register') // http://localhost:5000/user-register
export class SignupController {
    constructor(
        private readonly signupService: SignupService
    ) { }

    @Post()
    registerUser(@Body() signupDto: SignUpDto) {
        return this.signupService.registerUser(signupDto);
    }
}


