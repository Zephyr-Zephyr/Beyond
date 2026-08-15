import { Events } from "discord.js";
import { baseEmbed, COLORS, sendLog } from "../utils.js";
import { getGuildConfig } from "../store.js";

export const name = Events.MessageDelete;

export async function execute(message) {
  if (!message.guild || message.author?.bot) return;
  const embed = baseEmbed(COLORS.danger)
    .setTitle("🗑️ Message Deleted")
    .setDescription(message.content?.slice(0, 1000) || "*No text content*")
    .addFields(
      { name: "Author", value: `${message.author ?? "Unknown"}`, inline: true },
      { name: "Channel", value: `${message.channel}`, inline: true }
    );
  sendLog(getGuildConfig, message.guild, "messageDelete", embed);
}
