import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getNonce(publicAddress: string): Promise<number> {
    const user = await this.userModel.findOne({ publicAddress: publicAddress });
    if (user) return user.nonce;
    else {
      const user = await this.createNewUser(publicAddress);
      return user.nonce;
    }
  }

  async createNewUser(publicAddress: string): Promise<UserDocument> {
    const user = await this.userModel.create({
      publicAddress: publicAddress,
      username: publicAddress,
    });

    return user;
  }

  async verifySignature(publicAddress: string, signature: string) {
    const user = await this.userModel.findOne({ publicAddress: publicAddress });
    const { nonce } = user;
    const msg = `I am signing my one-time nonce: ${nonce}`;

    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf-8'));
    const address = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });

    if (address.toLowerCase() === publicAddress.toLowerCase()) {
      console.log("SUCCESS")
      console.log(user)
      return {
        success : true
      };
    }

  }
}
