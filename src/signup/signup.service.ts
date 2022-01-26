import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserModel } from 'src/models/user.model';

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
                return { error: { message: 'Такой пользователь уже существует! Попробуйте другую почту!' }, status: false };
            }

            const hashPassword = bcrypt.hashSync(user.userPassword, 10);

            const newUser = new this.userModel({
                userlogin: user.userLogin,
                useremail: user.userEmail,
                userpassword: hashPassword,
                userrole: 'User',
                userlvl: 1,
                userxp: 0
            })

            await newUser.save();

            return { newUser, status: true };
        } catch (error) {
            console.error(error);
        }
    }
}
