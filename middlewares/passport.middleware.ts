import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { JWTPayloadType } from "../utils";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new Strategy(opts, async function (jwt_payload: JWTPayloadType, done: any) {
    if (jwt_payload?.id) {
      return done(null, jwt_payload);
    }
    return done(null, false);
  })
);

export { passport };
