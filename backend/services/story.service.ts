import * as StoryRepo from '../repositories/story.repo.js';

export async function getStories() {
  return StoryRepo.getAllStories();
}

export async function getStory(id: string) {
  return StoryRepo.getStory(id);
}

export async function addStory(data: StoryRepo.CreateStoryData) {
  return StoryRepo.createStory(data);
}

export async function deleteStory(id: string) {
  return StoryRepo.deleteStory(id);
}
