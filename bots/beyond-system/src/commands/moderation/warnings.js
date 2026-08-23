import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { baseEmbed } from "../../utils.js";
import { getWarns } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("warnings")
  .setDescription("List warnings for a member.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  .addUserOption((o) => o.setName("user").setDescription("Member").setRequired(true));

export async function execute(interaction) {
  const target = interaction.options.getUser("user", true);
  const warns = getWarns(interaction.guild.id, target.id);

  const embed = baseEmbed().setTitle(`⚠️ Warnings for ${target.tag}`);
  if (warns.length === 0) {
    embed.setDescription("No warnings on record.");
  } else {
    embed.setDescription(
      warns.map((w, i) => `**${i + 1}.** ${w.reason} — <@${w.moderatorId}> · <t:${Math.floor(w.timestamp / 1000)}:R>`).join("\n")
    );
  }
  await interaction.reply({ embeds: [embed], ephemeral: true });
}
