import * as TagRepo from '../repositories/tag.repo.js';

export async function getTags() {
  return TagRepo.getAllTags();
}

export async function createTag(data: TagRepo.CreateTagData) {
  return TagRepo.createTag(data);
}

export async function deleteTag(id: string) {
  return TagRepo.deleteTag(id);
}
