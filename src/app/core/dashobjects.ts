import { IghRepo, IghRepoOwner, IghOrg } from './ghobjects';
export interface IDash {
    lastUpdate: number; // .getTime() of last update date
    favRepos: IghRepo[];
}

