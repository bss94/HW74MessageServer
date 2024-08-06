import express from 'express';
import {IMessage, IGetResponse} from '../types';
import {promises as fs} from 'fs';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  try {
    const dirName = './messages';
    const files = await fs.readdir(dirName);
    const data = files.map(async (file) => {
      return await fs.readFile(dirName + '/' + file);
    });
    const messages = await Promise.all(data);
    let result: IGetResponse[] = [];
    messages.forEach((message, index) => {
      result.push({
        ...JSON.parse(message.toString()),
        datetime: files[index].replace(/;/g, ":").slice(0, -4),
      });
    });
    if (result.length > 5) {
      result = result.slice(result.length - 5);
    }
    res.send(result);
  }catch (e){
    res.send([e]);
  }

});

messagesRouter.post('/', async (req, res) => {
  const postTime = new Date().toISOString();
  const postName = postTime.replace(/:/g, ";");
  if(req.body.message){
    const message: IMessage = {
      message: req.body.message,
    };
    await fs.writeFile(`./messages/${postName}.txt`, JSON.stringify(message));
    res.send({message: req.body.message, datetime: postTime});
  }else {
    console.error('Uncorrected request')
    res.send({error: 'uncorrected request', datetime: postTime});
  }
});

export default messagesRouter;
