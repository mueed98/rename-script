import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { configService } from "./config/configuration";

import nfts from 'src/models/nfts';
import { ObjectId } from 'mongodb';

const _ = require('lodash');
const mongoose = require('mongoose');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

    this.test();
  }

  private async test(){


    let skip = 0;
    const limit = 1000;
    const collectionId = configService.getValue("COLLECTION_ID");

    do{

    await this.connectToMongo();

    const nftData = await nfts.find({numeric_id : null}).select(['numeric_id', 'token_id']).skip(skip).limit(limit).lean();

    if(_.size(nftData) == 0)
      break;
    

    for ( let i=0; i< _.size(nftData); i++ ){
      
      let dataToDB = {
        numeric_id :  nftData[i]['token_id'] ? parseInt(nftData[i]['token_id']) : null
      }

      console.log(nftData[i]);

      console.log(dataToDB);
      
      //await nfts.findByIdAndUpdate({_id :nftData[i]['_id'] } , dataToDB).lean();
    }

    console.log("--> size of nftdata : ", _.size(nftData));
    skip = skip + 1000;
    console.log("--> parsed records : ", skip);

    const count = await nfts.count({numeric_id : null});
    console.log('--> NFTs remaining to Fix : ', count);

    }while(true);

    console.log('--- All Done ---');

  }

  private async connectToMongo(){
    mongoose.connect(configService.getValue('MONGO_URL'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {})
    .catch((err) => {
    console.log(`MONGO CONNECTION ERROR!`);
    console.log(err);
    })
  }

}
