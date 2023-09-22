import type { NextApiRequest, NextApiResponse } from "next";
import { airportOptions } from "@/common/airports";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(airportOptions);
} 