export interface ISkillInfos {
  name: string;
  url: string;
  description: string;
}

export interface IRawJob {
  id: number;
  title: string;
  company: string;
  url: string;
  description: string;
  skillList: string;
  // skills: ISkillInfos[];
  todo: string;
}

export interface IJobs {
  id: number;
  title: string;
  company: string;
  url: string;
  description: string;
  skillList: string;
  skills: ISkillInfos[];
  todo: string;
}
