import { Events } from "discord.js";
import { baseEmbed, COLORS, sendLog } from "../utils.js";
import { getGuildConfig } from "../store.js";

export const name = Events.ChannelUpdate;

export async function execute(oldChannel, newChannel) {
  if (!newChannel.guild || oldChannel.name === newChannel.name) return;
  const embed = baseEmbed(COLORS.primary)
    .setTitle("✏️ Channel Renamed")
    .addFields({ name: "Before", value: oldChannel.name, inline: true }, { name: "After", value: newChannel.name, inline: true });
  sendLog(getGuildConfig, newChannel.guild, "channelChange", embed);
}
