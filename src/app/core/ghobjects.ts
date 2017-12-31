export interface IghOrg  {
    login: string;
    id: number;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
  }

  export interface IghRepoOwner  {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }

  export interface IghRepo {
    id: number;
    selected?: boolean;
    owner: IghRepoOwner;
    name: string;
    full_name: string;
    description: string;
    private: boolean;
    fork: boolean;
    url: string;
    html_url: string;
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    clone_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    deployments_url: string;
    downloads_url: string;
    events_url: string;
    forks_url: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    hooks_url: string;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    mirror_url: string;
    notifications_url: string;
    pulls_url: string;
    releases_url: string;
    ssh_url: string;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    svn_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    homepage: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
    size: number;
    default_branch: string;
    open_issues_count: number;
    topics: string[];
    has_issues: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_downloads: boolean;
    archived: boolean;
    pushed_at: string;
    created_at: string;
    updated_at: string;
    permissions: {
      admin: boolean;
      push: boolean;
      pull: boolean
    };
    allow_rebase_merge: boolean;
    allow_squash_merge: boolean;
    allow_merge_commit: boolean;
    subscribers_count: number;
    network_count: number;
  }
export interface IghMilestone {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  number: number;
  state: string;
  title: string;
  description: string;
  creator: IghRepoOwner;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  due_on: string;
}

export interface IghLabel {
  id: number;
  url: string;
  name: string;
  color: string;
  default: boolean;
}

export interface IghPull  {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
}
export interface IghIssue {
  id: number;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  user: IghRepoOwner;
  labels: IghLabel[];
  assignee: IghRepoOwner;
  assignees: IghRepoOwner[];
  milestone: IghMilestone;
  locked: false;
  comments: number;
  pull_request: IghPull;
  closed_at: string;
  created_at: string;
  updated_at: string;
  repository: IghRepo;
}
