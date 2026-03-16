import { config } from "dotenv";
import { seedDemoWorkspace } from "./seed-demo";

config({ path: ".env.local" });
config();

async function main() {
  const projectSlug = await seedDemoWorkspace();
  console.log(`Seed completed for project: ${projectSlug}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
