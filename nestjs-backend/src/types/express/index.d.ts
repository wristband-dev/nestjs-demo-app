import { Session } from '../session/session.interface';

declare global {
  namespace Express {
    interface Request {
      session: Session;
    }
  }
}
