import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { appConfig } from "./config/app.config";
import { corsConfig } from "./config/cors.config";
import { apiEnvFilePaths } from "./config/env-file-paths";
import { HealthModule } from "./health/health.module";
import { AccountModule } from "./modules/account/account.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ContactsModule } from "./modules/contacts/contacts.module";
import { GroupsModule } from "./modules/groups/groups.module";
import { ImportsModule } from "./modules/imports/imports.module";
import { InteractionsModule } from "./modules/interactions/interactions.module";
import { RelationshipsModule } from "./modules/relationships/relationships.module";
import { RemindersModule } from "./modules/reminders/reminders.module";
import { TagsModule } from "./modules/tags/tags.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: apiEnvFilePaths,
      expandVariables: true,
      isGlobal: true,
      load: [appConfig, corsConfig],
    }),
    AccountModule,
    AuthModule,
    ContactsModule,
    GroupsModule,
    HealthModule,
    ImportsModule,
    InteractionsModule,
    RelationshipsModule,
    RemindersModule,
    TagsModule,
    UsersModule,
  ],
})
export class AppModule {}
