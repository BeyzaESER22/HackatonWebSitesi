import { getStaticProjects, sampleProjectId } from '@/data/projects';
import { readStore } from '@/lib/store';

function projectTime(project) {
  const value = Date.parse(project?.submittedAt || project?.updatedAt || '');
  return Number.isFinite(value) ? value : 0;
}

export function sortNewestProjects(projects) {
  return [...projects].sort((a, b) => projectTime(b) - projectTime(a));
}

export function isVisibleProject(project) {
  return project?.status !== 'rejected';
}

export async function loadSubmittedProjects({ includeRejected = false } = {}) {
  try {
    const all = await readStore('projects.json');
    return includeRejected ? all : all.filter(isVisibleProject);
  } catch (err) {
    console.error('Project store read error:', err);
    return [];
  }
}

export async function loadPublicProjects() {
  const staticProjects = getStaticProjects();
  const submittedProjects = await loadSubmittedProjects();

  const sample = staticProjects.find((project) => project.id === sampleProjectId);
  const otherStaticProjects = staticProjects.filter((project) => project.id !== sampleProjectId);
  const sortedSubmittedProjects = sortNewestProjects(submittedProjects);

  return [sample, ...otherStaticProjects, ...sortedSubmittedProjects].filter(Boolean);
}

export async function findPublicProjectById(id) {
  const staticProject = getStaticProjects().find((project) => project.id === id);
  if (staticProject) return staticProject;

  const submittedProjects = await loadSubmittedProjects();
  return submittedProjects.find((project) => project.id === id) || null;
}
