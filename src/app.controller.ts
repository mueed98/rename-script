import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { configService } from "./config/configuration";

import whitelist from './models/whitelist';
import users from 'src/models/users';
import nftTransfers from "./models/nftTransfers";
import collections from "./models/collections";
import nfts from "./models/nfts";
import posts from 'src/models/posts';
import favorites from 'src/models/favorites';
import follows from 'src/models/follows';
import flags from 'src/models/flags';
import { ObjectId } from 'mongodb';
import { Collection } from 'mongoose';

const  axios  = require('axios');
let s3;
const  aws  = require('aws-sdk');
const  crypto  = require('crypto');

const _ = require('lodash');
const mongoose = require('mongoose');

const Web3Utils = require('web3-utils');

@Controller()
export class AppController implements OnModuleInit{
  constructor(private readonly appService: AppService) {}

  async onModuleInit(){

  }

  private async deleteInconsistentFavs(){

    await this.connectToMongo();
    
    const favs = await favorites.find({}).select(['posts']).lean();

    let favToDelete = [];
    for(let i = 0 ; i < _.size(favs); i++){
      const res = await posts.exists({_id : favs[i]['posts']})
      if( res == null)
        favToDelete.push(favs[i]['_id']);
    }

    //await favorites.deleteMany({_id : {$in : favToDelete}});

    console.log(favToDelete);

    console.log('--- All Done ---');
  }


  private trimTest(){

    const temp = "      Hellooo\nWorld\n\nTest        ";
    console.log(temp);
    console.log('----------------------------------');
    console.log(temp.trim());

  }

  private async imagesUpload(){
    //https://images.trackthemyth.io/doodles-official_image_16567683030694a92133a80faec3d
    console.log(await this.urlToS3('https://yt3.ggpht.com/jOdcRLZg7sRCm0fLfqTmd_bgBlr9U_LPR8wb0GRErazL_dLOMDsGeOHdgaQy9ejYYwousLcW=s900-c-k-c0x00ffffff-no-rj', 'azuki', 'image' ) ) ;
  }

  private async addSortIds(){

    const collectionId = configService.getValue("COLLECTION_ID");

    await this.connectToMongo();

    await collections.findById({_id : new ObjectId(collectionId)}).lean();

    const collectionData = await collections.findByIdAndUpdate({_id : new ObjectId(collectionId)}, {sort_id : 5}, {new : true}).lean();
    console.log('--> Collection : ', collectionData);

      console.log('--- All Done ---');
  }

  private async updateNFTaddresses(){

    const collectionId = configService.getValue("COLLECTION_ID");

    await this.connectToMongo();

    const collectionData = await collections.findById({_id : new ObjectId(collectionId)}).lean();
    const nftData = await nfts.find({nftCollection : new ObjectId(collectionId)}).select(['_id']).lean();

    console.log('--> Collection Address : ', collectionData['address']);
    console.log('--> Total NFTs : ',_.size(nftData));

    let ids = []
    for(let i = 0 ; i < _.size(nftData); i++){
      ids.push(nftData[i]['_id']);
    }

    const collectionAddress = await Web3Utils.toChecksumAddress(collectionData['address']);
    await nfts.bulkWrite( [ {updateMany : 
      {
        'filter' : {_id : {$in : ids} },
        'update' : {address : collectionAddress },
      }}]);

      console.log('--- All Done ---');
  }


  private async test(){




    // do{

    // const count = await nfts.count({numeric_id : null});
    // console.log('--> NFTs remaining to Fix : ', count);

    // if(_.size(nftData) == 0)
    //   break;
    

    // for ( let i=0; i< _.size(nftData); i++ ){
      
    //   let dataToDB = {
    //     numeric_id :  nftData[i]['token_id'] ? parseInt(nftData[i]['token_id']) : null
    //   }

    //   // console.log(nftData[i]);

    //   // console.log(dataToDB);
      
    //   await nfts.findByIdAndUpdate({_id :nftData[i]['_id'] } , dataToDB).lean();
    // }

    // console.log("--> size of nftdata : ", _.size(nftData));

    // }while(true);

    console.log('--- All Done ---');

  }


  private async urlToS3(_image_url:string , _openSeaMetaSlug:any, type:string) {

    await this.connectToAWS();

    if( _image_url === null )
      return null;
  
    let url=_image_url;
    let key = _openSeaMetaSlug + "_" + type + "_" + Date.now() + crypto.randomBytes(8).toString('hex');
    let bucket = configService.getValue('BUCKET_NAME');  
  
    try {
      const { data } = await axios.get(url, { responseType: "stream" });
  
      const upload = await s3.upload({
        Bucket: bucket,
        Key: key,
        Body: data,
      }).promise();
  
      let newLink = upload.Location.split("/");
      newLink = configService.getValue('TTM_S3_LINK') + newLink[_.size(newLink) - 1];
  
      return newLink;
    } catch (error) {
      console.error(error);
      return null;
      throw new Error;
    }
  
  }

  private async connectToMongo(){
    mongoose.connect(configService.getValue('MONGO_URL'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {})
    .catch((err) => {
    console.log(`MONGO CONNECTION ERROR!`);
    console.log(err);
    })
  }

  private async connectToAWS(){
    try{
      s3 = new aws.S3({
        accessKeyId: configService.getValue('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.getValue('AWS_SECRECT_ACCESS_KEY'),
      }) 
      } catch(e){
        console.log(e);
      }
  }
  

}
