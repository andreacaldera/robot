import express from 'express';

export default () => {
  const router = express.Router();

  router.get('/set-speed', (req, res, next) =>
    Promise.resolve()
      .then(() => res.send({ ok: 'ok' }))
      .catch(next)
    // TODO
  );

  router.get('/steer', (req, res, next) =>
    Promise.resolve()
      .then(() => res.send({ ok: 'ok' }))
      .catch(next)
    // TODO
  );

  router.get('/*', (req, res, next) =>
    next(new Error('Not found'))
  );


  return router;
};
