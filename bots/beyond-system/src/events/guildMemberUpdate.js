import { Events } from "discord.js";
import { baseEmbed, COLORS, sendLog } from "../utils.js";
import { getGuildConfig } from "../store.js";

export const name = Events.GuildMemberUpdate;

export async function execute(oldMember, newMember) {
  const added = newMember.roles.cache.filter((r) => !oldMember.roles.cache.has(r.id));
  const removed = oldMember.roles.cache.filter((r) => !newMember.roles.cache.has(r.id));
  if (added.size === 0 && removed.size === 0) return;

  const embed = baseEmbed(COLORS.primary).setTitle("🎭 Roles Updated").setDescription(`${newMember.user}`);
  if (added.size) embed.addFields({ name: "Added", value: added.map((r) => `${r}`).join(", ") });
  if (removed.size) embed.addFields({ name: "Removed", value: removed.map((r) => `${r}`).join(", ") });

  sendLog(getGuildConfig, newMember.guild, "roleChange", embed);
}
