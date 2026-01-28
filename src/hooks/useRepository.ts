import { useQuery } from "@tanstack/react-query";

interface GitHubRepoDetail {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  created_at: string;
  homepage: string | null; // Added homepage field
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface RepositoryDetailData {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  updatedAt: string;
  createdAt: string;
  homepageUrl: string | null; // Added homepageUrl to the processed data
  topics: string[];
  ownerLogin: string;
  ownerAvatarUrl: string;
  ownerHtmlUrl: string;
}

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

const fetchGitHubRepoDetail = async (owner: string, repoName: string): Promise<GitHubRepoDetail> => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json, application/vnd.github.mercy-preview+json",
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, { headers });
  if (!response.ok) {
    // Check if it's a rate limit error specifically
    if (response.status === 403) {
      const errorBody = await response.json();
      if (errorBody.message.includes("rate limit exceeded")) {
        throw new Error(`GitHub API rate limit exceeded. Please use a VITE_GITHUB_API_TOKEN.`);
      }
    }
    throw new Error(`Failed to fetch repository details for ${owner}/${repoName}: ${response.statusText}`);
  }
  return response.json();
};

export const useRepository = (owner: string, repoName: string) => {
  return useQuery<RepositoryDetailData, Error>({
    queryKey: ["githubRepository", owner, repoName],
    queryFn: async () => {
      const repo = await fetchGitHubRepoDetail(owner, repoName);
      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        htmlUrl: repo.html_url,
        description: repo.description,
        language: repo.language,
        stargazersCount: repo.stargazers_count,
        forksCount: repo.forks_count,
        openIssuesCount: repo.open_issues_count,
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
        homepageUrl: repo.homepage, // Map homepage from API to homepageUrl
        topics: repo.topics ?? [],
        ownerLogin: repo.owner.login,
        ownerAvatarUrl: repo.owner.avatar_url,
        ownerHtmlUrl: repo.owner.html_url,
      };
    },
    enabled: !!owner && !!repoName,
    staleTime: Infinity, // Only refetch on hard reload
    gcTime: Infinity,
    retry: 2,
  });
};
