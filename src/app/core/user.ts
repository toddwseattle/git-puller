import { IghOrg } from './ghobjects';

export interface IUser {
    uid: string;
    email: string;
    photoUrl?: string;
    userName?: string;
    displayName?: string;
    ghAccessToken?: string;
    ghUser?: IGHUser;
    }

export class User implements IUser {
    uid: string;
    email: string;
    photoUrl?: string;
    userName?: string;
    displayName?: string;
    ghAccessToken?: string;
    ghUser?: IGHUser;
    constructor(u: IUser) {
        this.uid = u.uid;
        this.email = u.email;
        if (u.photoUrl) { this.photoUrl = u.photoUrl; }
        if (u.userName) { this.userName = u.userName; }
        if (u.photoUrl) { this.userName = u.userName; }
        if (u.displayName) { this.displayName = u.displayName; }
        if (u.ghAccessToken) { this.ghAccessToken = u.ghAccessToken; }
        if (u.ghUser) { this.ghUser = u.ghUser; }
    }
    toOrg(): IghOrg {
        return({
            login: this.ghUser.login,
            id: this.ghUser.id,
            url: this.ghUser.html_url,
            repos_url: this.ghUser.repos_url,
            events_url: this.ghUser.events_url,
            hooks_url: null,
            issues_url: null,
            members_url: this.ghUser.url,
            public_members_url: this.ghUser.url,
            avatar_url: this.ghUser.avatar_url,
            description: this.ghUser.bio
        });
    }
}
/**
 *  IGHUser describes the V3 Github API User
 */
export interface IGHUser {
        login: string;
        id: number;
        avatar_url?: string;
        gravatar_id?: string;
        url?: string;
        html_url?: string;
        followers_url?: string;
        following_url?: string;
        gists_url?: string;
        starred_url?: string;
        subscriptions_url?: string;
        organizations_url?: string;
        repos_url?: string;
        events_url?: string;
        received_events_url?: string;
        type?: string;
        site_admin?: boolean;
        name?: string;
        company?: string;
        blog?: string;
        location?: string;
        email?: string;
        hireable?: string;
        bio?: string;
        public_repos?: number;
        public_gists?: number;
        followers?: number;
        following?: number;
        created_at?: string;
        updated_at?: string;
}
