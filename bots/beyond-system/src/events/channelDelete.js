import { Events } from "discord.js";
import { baseEmbed, COLORS, sendLog } from "../utils.js";
import { getGuildConfig } from "../store.js";

export const name = Events.ChannelDelete;

export async function execute(channel) {
  if (!channel.guild) return;
  const embed = baseEmbed(COLORS.danger).setTitle("➖ Channel Deleted").setDescription(`#${channel.name}`);
  sendLog(getGuildConfig, channel.guild, "channelChange", embed);
}
