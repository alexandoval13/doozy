import { Request, Response } from 'express';
import * as TagService from '../services/tag.service.js';

export async function getAllTags(req: Request, res: Response) {
  try {
    const tags = await TagService.getTags();
    res.json(tags);
  } catch (err) {
    res.status(500).send('Error: failed to fetch tags');
  }
}

export async function addTag(req: Request, res: Response) {
  try {
    const newTag = await TagService.createTag(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json('Failed to create tag');
  }
}

export async function deleteTag(req: Request, res: Response) {
  try {
    await TagService.deleteTag(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete story' });
  }
}
