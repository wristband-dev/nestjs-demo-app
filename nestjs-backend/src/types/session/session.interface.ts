import { IronSession } from 'iron-session';

import { Role } from '../wristband/wristband.interface';

// Define the custom fields you want in your session
export interface SessionData {
  accessToken: string;
  csrfToken: string;
  expiresAt: number;
  identityProviderName: string;
  isAuthenticated: boolean;
  refreshToken: string;
  roles: Role[];
  tenantCustomDomain?: string;
  tenantDomainName: string;
  tenantId: string;
  userId: string;
}

// Extend IronSession with your custom session data
export type Session = IronSession<SessionData>;
