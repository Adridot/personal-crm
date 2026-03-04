import { Module } from "@nestjs/common";
import { AuthModule as BetterAuthNestModule } from "@thallesp/nestjs-better-auth";

import { auth } from "../../lib/auth";

@Module({
  imports: [
    BetterAuthNestModule.forRoot({
      auth,
      disableBodyParser: false,
      disableGlobalAuthGuard: false,
      disableTrustedOriginsCors: true,
    }),
  ],
})
export class AuthModule {}
