import { SlashCommandBuilder } from "discord.js";
import { baseEmbed } from "../../utils.js";

export const data = new SlashCommandBuilder()
  .setName("userinfo")
  .setDescription("Show information about a member.")
  .addUserOption((o) => o.setName("user").setDescription("Member (defaults to you)"));

export async function execute(interaction) {
  const target = interaction.options.getUser("user") ?? interaction.user;
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  const embed = baseEmbed()
    .setTitle(target.tag)
    .setThumbnail(target.displayAvatarURL())
    .addFields(
      { name: "ID", value: target.id, inline: true },
      { name: "Account Created", value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>`, inline: true }
    );

  if (member) {
    const roles = member.roles.cache.filter((r) => r.id !== interaction.guild.id).map((r) => `${r}`);
    embed.addFields(
      { name: "Joined Server", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
      { name: "Roles", value: roles.length ? roles.join(", ") : "None" }
    );
  }

  await interaction.reply({ embeds: [embed] });
}
