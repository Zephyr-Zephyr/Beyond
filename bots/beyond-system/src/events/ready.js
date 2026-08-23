import { Events, ActivityType } from "discord.js";

export const name = Events.ClientReady;
export const once = true;

export async function execute(client) {
  console.log(`✅ Beyond System online as ${client.user.tag}`);
  client.user.setActivity("🚀 beyond", { type: ActivityType.Watching });
}
