import { Events } from "discord.js";
import { baseEmbed, COLORS, sendLog } from "../utils.js";
import { getGuildConfig } from "../store.js";

export const name = Events.ChannelCreate;

export async function execute(channel) {
  if (!channel.guild) return;
  const embed = baseEmbed(COLORS.success).setTitle("➕ Channel Created").setDescription(`${channel} (${channel.name})`);
  sendLog(getGuildConfig, channel.guild, "channelChange", embed);
}
