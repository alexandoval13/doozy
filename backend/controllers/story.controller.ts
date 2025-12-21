import { Request, Response } from 'express';
import * as StoryService from '../services/story.service.js';

export async function getAllStories(req: Request, res: Response) {
  try {
    const stories = await StoryService.getStories();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export async function createStory(req: Request, res: Response) {
  try {
    const story = await StoryService.addStory(req.body);
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create story' });
  }
}

export async function deleteStory(req: Request, res: Response) {
  try {
    await StoryService.deleteStory(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete story' });
  }
}
