import express from 'express';
import {IMessage} from '../types';
import {promises as fs} from 'fs';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  res.send('this is a message');
});

messagesRouter.post('/create', async (req, res) => {
  const postTime = new Date().toISOString();
  const postName = postTime.replace(/:/g, ";");
  const message: IMessage = {
    message: req.body.message,
  };

  await fs.writeFile(`./messages/${postName}.txt`, JSON.stringify(message));

  res.send({message: req.body.message, datetime: postTime});
});

export default messagesRouter;
