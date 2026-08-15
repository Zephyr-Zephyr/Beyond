import { SlashCommandBuilder, version as djsVersion } from "discord.js";
import { baseEmbed } from "../../utils.js";

export const data = new SlashCommandBuilder().setName("about").setDescription("About Lunaris Mini System.");

export async function execute(interaction) {
  const embed = baseEmbed()
    .setTitle("🌙 Lunaris Mini System")
    .setDescription(
      "The central Discord bot of the Lunaris Mini project — moderation, tickets, logging and welcome, all in one, with more modules coming over time."
    )
    .addFields(
      { name: "Servers", value: `${interaction.client.guilds.cache.size}`, inline: true },
      { name: "discord.js", value: djsVersion, inline: true },
      { name: "Node.js", value: process.version, inline: true }
    );
  await interaction.reply({ embeds: [embed] });
}
