import { Events } from "discord.js";
import { getGuildConfig } from "../store.js";
import { baseEmbed, COLORS, fillPlaceholders, sendLog } from "../utils.js";

export const name = Events.GuildMemberAdd;

export async function execute(member) {
  const config = getGuildConfig(member.guild.id);

  if (config.welcome.enabled && config.welcome.channelId) {
    const channel = member.guild.channels.cache.get(config.welcome.channelId);
    if (channel) {
      const text = fillPlaceholders(config.welcome.message, { user: member.user, guild: member.guild });
      channel.send(text).catch(() => {});
    }
  }

  if (config.autoroleId) {
    const role = member.guild.roles.cache.get(config.autoroleId);
    if (role) member.roles.add(role).catch(() => {});
  }

  const logEmbed = baseEmbed(COLORS.success)
    .setTitle("📥 Member Joined")
    .setDescription(`${member.user} (${member.user.tag})`)
    .addFields({ name: "Account Created", value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>` });
  sendLog(getGuildConfig, member.guild, "memberJoin", logEmbed);
}
