import fs from 'fs';

import jobs from './data/jobs.json';
import skillInfos from './data/skillInfos.json';

interface IJobs {
  id: number;
  title: string;
  company: string;
  url: string;
  description: string;
  skillList: string;
  todo: string;
}

interface ISkillInfos {
  name: string;
  url: string;
  description: string;
}

export const getApiDocumentationHtml = () => {
  return `<h1>GET A JOB API</h1> <ul>
  <li><a href="/jobs">/jobs</a>- returns an array of job objects</li>
  </ul>`;
};

export const getJobs = () => {
  return jobs;
};

export const getTodos = () => {
  const todos = jobs.map((job) => {
    return { todo: job.todo, company: job.company, title: job.title };
  });
  return todos;
};
