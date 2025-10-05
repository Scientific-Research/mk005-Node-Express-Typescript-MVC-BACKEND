import fs from 'fs';

import rawJobs from './data/jobs.json';
import skillInfos from './data/skillInfos.json';
import { IJobs, IRawJob, ISkillInfos, nullObjectSkill } from './interface';

export const getApiDocumentationHtml = () => {
  return `<h1>GET A JOB API</h1> <ul>
  <li><a href="/jobs">/jobs</a>- returns an array of job objects</li>
  </ul>`;
};

export const getJobs = () => {
  const jobs: IJobs[] = [];
  rawJobs.forEach((rawJob: IRawJob) => {
    const job: IJobs = {
      ...rawJob,
      // skills: [],
      skills: buildSkills(rawJob.skillList),
    };
    jobs.push(job);
  });
  return jobs;
};

export const buildSkills = (skillList: string) => {
  const skillIdCodes = skillList.split(',').map((s) => s.trim());
  // console.log(skillIdCodes);

  const skills: ISkillInfos[] = [];
  skillIdCodes.forEach((skillIdCode) => {
    // const _skill = skillIdCodes.indexOf(skillIdCode);
    const _skill = skillInfos.find(
      (info: ISkillInfos) => info.idCode === skillIdCode
    );
    console.log(_skill);

    let skill: ISkillInfos;
    if (_skill === undefined) {
      skill = {
        ...nullObjectSkill,
        idCode: skillIdCode,
      };
    } else {
      skill = {
        ..._skill,
        idCode: skillIdCode,
      };
    }
    skills.push(skill);
  });
  // console.log(skillList);
  // return [];
  return skills;
};

export const getTodos = () => {
  const todos = rawJobs.map((job) => {
    return { todo: job.todo, company: job.company, title: job.title };
  });
  return todos;
};
