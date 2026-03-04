import { Injectable } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import type { AccountMeResponse } from "@personal-crm/contracts";

const toIsoString = (value: Date | string): string =>
  value instanceof Date ? value.toISOString() : value;

@Injectable()
export class AccountService {
  getCurrentAccount(session: UserSession): AccountMeResponse {
    return {
      session: {
        expiresAt: toIsoString(session.session.expiresAt),
        id: session.session.id,
      },
      user: {
        email: session.user.email,
        emailVerified: session.user.emailVerified,
        id: session.user.id,
        image: session.user.image ?? null,
        name: session.user.name ?? null,
      },
    };
  }
}
