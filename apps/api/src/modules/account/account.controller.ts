import { Controller, Get, Inject } from "@nestjs/common";
import type { AccountMeResponse } from "@personal-crm/contracts";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";

import { AccountService } from "./account.service";

@Controller("account")
export class AccountController {
  constructor(
    @Inject(AccountService) private readonly accountService: AccountService
  ) {}

  @Get("me")
  getCurrentAccount(@Session() session: UserSession): AccountMeResponse {
    return this.accountService.getCurrentAccount(session);
  }
}
