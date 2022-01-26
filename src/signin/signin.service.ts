import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserModel } from 'src/models/user.model';

interface User {
    userEmail: string;
    userPassword: string;
}

@Injectable()
export class SigninService {
    constructor(
        @InjectModel('User') private userModel: Model<UserModel>
    ) { }

    async loginUser(user: User) {
        try {
            
            const candidate = await this.userModel.findOne({ useremail: user.userEmail });
            
            if(!candidate) {
                return { error: { message: `Пользователь не найден!` }, status: false };
            }

            const isMatchPass = await bcrypt.compare(user.userPassword, candidate.userpassword.toString());

            if(!isMatchPass) {
                return { error: { message: `Неверный пароль или эл. почта!` }, status: false };
            }

            return {
                oldUser: {
                    id: candidate._id,
                    userlogin: candidate.userlogin,
                    useremail: candidate.useremail,
                    userrole: candidate.userrole,
                    userlvl: candidate.userlvl,
                    userxp: candidate.userxp,
                },
                status: true
            }

        } catch (error) {
            console.error(error);
        }
    }
}
