import { SlashCommandBuilder } from "discord.js";
import { baseEmbed } from "../../utils.js";

export const data = new SlashCommandBuilder().setName("ping").setDescription("Check the bot's latency.");

export async function execute(interaction) {
  const sent = await interaction.reply({ content: "Pinging...", fetchReply: true });
  const roundtrip = sent.createdTimestamp - interaction.createdTimestamp;
  const embed = baseEmbed()
    .setTitle("🏓 Pong!")
    .addFields(
      { name: "Roundtrip", value: `${roundtrip}ms`, inline: true },
      { name: "WebSocket", value: `${interaction.client.ws.ping}ms`, inline: true }
    );
  await interaction.editReply({ content: null, embeds: [embed] });
}
