import { rest } from "msw";
import { songs } from "./songs";

export const handlers = [
  rest.get("/v1/songs", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(songs));
  }),
];
