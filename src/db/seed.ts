import "dotenv/config";
import { seedDemoWorkspace } from "./seed-demo";

async function main() {
  const projectSlug = await seedDemoWorkspace();
  console.log(`Seed completed for project: ${projectSlug}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
