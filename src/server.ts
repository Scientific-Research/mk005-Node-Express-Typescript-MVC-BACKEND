// import http from 'http';
// import * as http from 'http';

// import http from 'http';
import express from 'express';
import fs from 'fs';
import cors from 'cors';
// import { IncomingMessage, ServerResponse } from 'http';
// import { generateMainContent } from './content';
import jobs from './data/jobs.json';
import { getApiDocumentationHtml } from './model';

interface IJobs {
  id: number;
  title: string;
  company: string;
  url: string;
  description: string;
  skillList: string;
  todo: string;
}

const app = express();
app.use(cors()); // erlaubt alle Origins

// oder spezifisch:
// app.use(cors({ origin: 'http://localhost:5173' }));

const port = 8000;

// const jobs = fs.readFileSync('./src/data/jobs.json', 'utf-8'); // in JSON Format => we can not use it => we have to use JSON.parse and then use it like following:

// const jobs: IJobs[] = JSON.parse(
//   fs.readFileSync('./src/data/jobs.json', 'utf-8')
// ); // in JS Object format => we can use it
console.log(jobs);

// using http.createServer
// http
//   .createServer((req: IncomingMessage, res: ServerResponse) => {
//     // const html = await generateMainContent(); // HTML bei jedem Request neu generieren
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     // res.write('info site');
//     // res.write(html);
//     res.write(JSON.stringify(jobs));
//     res.end();
//   })
//   .listen(port);

const todos = jobs.map((job) => {
  return { todo: job.todo, company: job.company, title: job.title };
});

// using express
app.get('/', (req: express.Request, res: express.Response) => {
  // res.send(
  //   'Job Site API. To see the complete list of Jobs, add "/jobs" at the END of URL => http://localhost:8000/jobs'
  // );

  res.send(getApiDocumentationHtml());
});

app.get('/jobs', (req: express.Request, res: express.Response) => {
  res.send(jobs); // showing the jobs on the browser or test.rest or Postmann => http://localhost:8000/jobs
  // res.json(jobs);
});

app.get('/todos', (req: express.Request, res: express.Response) => {
  res.send(todos);
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
