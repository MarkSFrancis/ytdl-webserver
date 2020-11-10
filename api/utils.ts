import { NextApiResponse } from "next";

export function attachment(res: NextApiResponse, filename: string) {
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
}
