import { Events } from "discord.js";
import { baseEmbed, COLORS, sendLog } from "../utils.js";
import { getGuildConfig } from "../store.js";

export const name = Events.MessageUpdate;

export async function execute(oldMessage, newMessage) {
  if (!newMessage.guild || newMessage.author?.bot) return;
  if (oldMessage.content === newMessage.content) return;

  const embed = baseEmbed(COLORS.warning)
    .setTitle("✏️ Message Edited")
    .addFields(
      { name: "Author", value: `${newMessage.author}`, inline: true },
      { name: "Channel", value: `${newMessage.channel}`, inline: true },
      { name: "Before", value: oldMessage.content?.slice(0, 500) || "*empty*" },
      { name: "After", value: newMessage.content?.slice(0, 500) || "*empty*" }
    );
  sendLog(getGuildConfig, newMessage.guild, "messageEdit", embed);
}
