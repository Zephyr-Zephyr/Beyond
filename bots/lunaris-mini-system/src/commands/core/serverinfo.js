import { SlashCommandBuilder } from "discord.js";
import { baseEmbed } from "../../utils.js";

export const data = new SlashCommandBuilder().setName("serverinfo").setDescription("Show information about this server.");

export async function execute(interaction) {
  const guild = interaction.guild;
  const owner = await guild.fetchOwner();

  const embed = baseEmbed()
    .setTitle(guild.name)
    .setThumbnail(guild.iconURL() ?? null)
    .addFields(
      { name: "Owner", value: `${owner}`, inline: true },
      { name: "Members", value: `${guild.memberCount}`, inline: true },
      { name: "Boost Level", value: `${guild.premiumTier}`, inline: true },
      { name: "Channels", value: `${guild.channels.cache.size}`, inline: true },
      { name: "Roles", value: `${guild.roles.cache.size}`, inline: true },
      { name: "Created", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true }
    );
  await interaction.reply({ embeds: [embed] });
}
