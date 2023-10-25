import { UPDATE_PROFILE_TRPC_SCHEMA } from '@/lib/validation-schemas/profile';
import { procedure, router } from '@/server/trpc';

import { users } from '@/db/schema';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const sqlite = new Database('sqlite');
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: 'drizzle' });

const profileRouter = router({
    updateProfile: procedure.input(UPDATE_PROFILE_TRPC_SCHEMA).mutation(async (opts) => {
        // TODO: save profile data to a db of your choosing
        const { username, bio, pfp } = opts.input;
        db.delete(users).run();
        await db.insert(users).values({ username: username, bio: bio, pfp: pfp }).run();
        return true;
    }),
    getProfile: procedure.query(async () => {
        // TODO: get profile data from db
        return await db.select().from(users).all();
    }),
});

export const appRouter = router({
    profile: profileRouter,
});

export type AppRouter = typeof appRouter;
