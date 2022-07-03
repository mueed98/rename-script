import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { configService } from "./config/configuration";
import users from 'src/models/users';
import posts from 'src/models/posts';
import flags from 'src/models/flags';
import nfts from 'src/models/nfts';
import collections from 'src/models/collections';
import { ObjectId } from 'mongodb';

const _ = require('lodash');
const mongoose = require('mongoose');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

    this.test();
  }

  private async test(){

    await this.connectToMongo();

    const skip = 3000;

    const limit = 1000;

    const collectionId = configService.getValue("COLLECTION_ID");
    
    const nftData = await nfts.find({nftCollection : new ObjectId(collectionId)}).select(['image']).skip(skip).limit(limit).lean();

    console.log("--> size of nftdata : ", _.size(nftData));
    

    for ( let i=0; i< _.size(nftData); i++ ){
      
      let dataToDB = {
        image : null,
      }
      //console.log(nftData);

      if(nftData[i]['image']){
            let newLink = nftData[i]['image'].split("/");
            dataToDB.image = 'https://images.trackthemyth.io/' + newLink[_.size(newLink) - 1];
          }
      
      console.log(dataToDB);
      
      //await nfts.findByIdAndUpdate({_id :nftData[i]['_id'] } , dataToDB).lean();
    }

    console.log("--> skip at : ", skip);
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
