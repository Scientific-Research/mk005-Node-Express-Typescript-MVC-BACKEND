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
  // console.log(skillIdCodes); ["angular", "cicd", "testing", "hotjar", "piwik"]

  const skills: ISkillInfos[] = [];
  skillIdCodes.forEach((skillIdCode, i) => {
    // First Solution:
    const _skillIdCode = skillIdCodes[i];
    // console.log(_skillIdCode); //'angular','cicd','testing','hotjar','piwik',...

    const skill = skillInfos.find(
      (info: ISkillInfos) => info.idCode === _skillIdCode
      // (info: ISkillInfos) => info.idCode === skillIdCode
    );

    // Second Solution:
    // const skill = skillInfos.find(
    //   // (info: ISkillInfos) => info.idCode === _skillIdCode
    //   (info: ISkillInfos) => info.idCode === skillIdCode
    // );

    /* skill : {
          idCode: 'angular',
          name: 'Angular',
          url: 'https://onespace.pages.dev/techItems?id=36',
          description: 'together with React and Vue.js one of the three most popular JavaScript frameworks'
      } */

    // let skill: ISkillInfos;
    // if (_skill !== undefined) {
    if (skill) {
      // skill = {
      //   // ...nullObjectSkill,
      //   // idCode: skillIdCode,
      // };
      // skill = {
      //   ..._skill,
      //   // idCode: skillIdCode,
      // };
      skills.push(skill);
      // skills.push(_skill);
    }
    // else {
    //   // skill = {
    //   //   ..._skill,
    //   //   // idCode: skillIdCode,
    //   // };
    // }
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
