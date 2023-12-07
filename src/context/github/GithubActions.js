import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
  baseURL: GITHUB_URL,
});

// Get search results
export const searchUsers = async (text) => {
  try {
    const params = new URLSearchParams({
      q: text,
    });

    const response = await github.get(`/search/users?${params}`);
    return response.data.items;
  } catch (error) {
    console.error('Error in searchUsers:', error.message);
    throw error; // Rethrow the error for the calling code to handle
  }
};

// Get user and repos
export const getUserAndRepos = async (login) => {
  try {
    const [user, repos] = await Promise.all([
      github.get(`/users/${login}`),
      github.get(`/users/${login}/repos`),
    ]);

    return { user: user.data, repos: repos.data };
  } catch (error) {
    console.error('Error in getUserAndRepos:', error.message);
    throw error; // Rethrow the error for the calling code to handle
  }
};
