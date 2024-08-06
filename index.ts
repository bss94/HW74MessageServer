import express from "express";
import messagesRouter from './routes/messages';

const app = express();
const port = 8000;

app.use(express.json());
app.get('/', (req, res) => {
  return res.send('<div><h3>Send GET request to "/messages" to get data from messages </br> or send POST request to "/messages with body {"message":"something message"} to Post on messages</h3></div>');
})
app.use('/messages', messagesRouter);

const run = async () => {

  app.listen(port, () =>
    console.log(`Server started on port ${port}`));

};
run().catch(console.error);