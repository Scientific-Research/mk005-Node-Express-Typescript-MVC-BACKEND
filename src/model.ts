import fs from 'fs';

import _jobs from './data/jobs.json';
import skillInfos from './data/skillInfos.json';

interface ISkillInfos {
  name: string;
  url: string;
  description: string;
}

interface IJobs {
  id: number;
  title: string;
  company: string;
  url: string;
  description: string;
  skillList: string;
  skills: ISkillInfos[];
  todo: string;
}

export const getApiDocumentationHtml = () => {
  return `<h1>GET A JOB API</h1> <ul>
  <li><a href="/jobs">/jobs</a>- returns an array of job objects</li>
  </ul>`;
};

export const getJobs = () => {
  const jobs: IJobs[] = [];
  _jobs.forEach((_job) => {
    const job = {
      ..._job,
      skills: [],
    };
    jobs.push(job);
  });
  return jobs;
};

export const getTodos = () => {
  const todos = _jobs.map((job) => {
    return { todo: job.todo, company: job.company, title: job.title };
  });
  return todos;
};
