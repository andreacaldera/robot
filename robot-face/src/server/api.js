import express from 'express';
import player from 'play-sound';

export default () => {
  const router = express.Router();

  router.get('/play/abunai-shiatsu', (req, res, next) =>
  // return res.sendStatus(202);
    player().play('./abunai-shiatsu.mp3', (err) => {
      console.log('ERROR', err);
      if (err) return next(err);
      return res.sendStatus(202);
    })
  );

  return router;
};
