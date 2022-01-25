import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserModel } from './signup.model';

interface User {
    userLogin: string;
    userEmail: string;
    userPassword: string;
}

@Injectable()
export class SignupService {
    constructor(
        @InjectModel('User') private userModel: Model<UserModel>
    ) { }

    async registerUser(user: User) {
        try {
            const candidate = await this.userModel.findOne({ useremail: user.userEmail });

            if (candidate) {
                return 'Такой пользователь уже существует! Попробуйте другую почту!';
            }

            const newUser = new this.userModel({
                userlogin: user.userLogin,
                useremail: user.userEmail,
                userpassword: user.userPassword,
                userrole: 'User',
                userlvl: 1,
                userxp: 0
            })

            await newUser.save();
        } catch (error) {
            console.error(error);
        }
    }
}
