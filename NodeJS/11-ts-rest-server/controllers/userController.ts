import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  res.json({ msg: "Get users" });
}

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ msg: "Get user", id });
}

export const postUser = (req: Request, res: Response) => {
  const { body } = req;
  res.json({ msg: "Post user", body });
}

export const putUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  res.json({ msg: "Put user", body, id });
}

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ msg: "Delete user", id });
}