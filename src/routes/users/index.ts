import { Request, Response } from "express";

export function GET(req: Request, res: Response) {
  return res.json({
    message: "Usuários carregados!",
  });
}
