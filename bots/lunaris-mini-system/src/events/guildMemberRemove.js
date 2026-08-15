import { Events } from "discord.js";
import { getGuildConfig } from "../store.js";
import { baseEmbed, COLORS, fillPlaceholders, sendLog } from "../utils.js";

export const name = Events.GuildMemberRemove;

export async function execute(member) {
  const config = getGuildConfig(member.guild.id);

  if (config.leave.enabled && config.leave.channelId) {
    const channel = member.guild.channels.cache.get(config.leave.channelId);
    if (channel) {
      const text = fillPlaceholders(config.leave.message, { user: member.user, guild: member.guild });
      channel.send(text).catch(() => {});
    }
  }

  const embed = baseEmbed(COLORS.danger).setTitle("📤 Member Left").setDescription(`${member.user.tag}`);
  sendLog(getGuildConfig, member.guild, "memberLeave", embed);
}
