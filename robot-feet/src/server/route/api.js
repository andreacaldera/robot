import express from 'express';

export default () => {
  const router = express.Router();

  router.get('/move', (req, res, next) =>
    Promise.resolve()
      .then(() => res.send({ ok: 'ok' }))
      .catch(next)
    // TODO
  );

  return router;
};
