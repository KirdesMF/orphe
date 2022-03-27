import { rest } from 'msw';

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', (req, res, ctx) => {}),
  // Handles a GET /user request
  rest.get('/user', (req, res, ctx) => {}),
];
