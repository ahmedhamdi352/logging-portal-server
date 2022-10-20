import { Request, Response, NextFunction } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import passport from 'passport';
import config from '../config';
import userRepository from '../repository/user';

export const authenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jwt } = config;
  passport
    .use(
      new Strategy(
        {
          secretOrKey: jwt.secret,
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (jwtPayload, done) => {
          let user = await userRepository.findOne(jwtPayload.id, [
            'role',
            'role.permissions',
          ]);
          if (user) {
            return done(null, user);
          } else return done(null, false);
        }
      )
    )
    .authenticate('jwt', { session: false }, (err, user, info) => {
      if (!!info || !!err) {
        return res.status(401).json({
          error: `Unauthenticated access`,
        });
      }
      req.user = user;
      return next();
    })(req, res, next);
};
