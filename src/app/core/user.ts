export interface IUser {
    uid: string;
    email: string;
    photoUrl?: string;
    userName?: string;
    displayName?: string;
    ghAccessToken?: string;
    ghUser?: IGHUser;
}
/**
 *  IGHUser describes the V3 Github API User
 */
export interface IGHUser {
        login: string;
        id: number;
        avatar_ur?: string;
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
