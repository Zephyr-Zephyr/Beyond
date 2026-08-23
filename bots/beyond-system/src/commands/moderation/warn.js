import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { baseEmbed, COLORS, sendLog } from "../../utils.js";
import { getGuildConfig, addWarn } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("warn")
  .setDescription("Warn a member.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  .addUserOption((o) => o.setName("user").setDescription("Member to warn").setRequired(true))
  .addStringOption((o) => o.setName("reason").setDescription("Reason").setRequired(true));

export async function execute(interaction) {
  const target = interaction.options.getUser("user", true);
  const reason = interaction.options.getString("reason", true);

  const warns = addWarn(interaction.guild.id, target.id, {
    reason,
    moderatorId: interaction.user.id,
    timestamp: Date.now(),
  });

  const embed = baseEmbed(COLORS.warning)
    .setTitle("⚠️ Member Warned")
    .addFields(
      { name: "User", value: `${target.tag}` },
      { name: "Moderator", value: `${interaction.user}` },
      { name: "Reason", value: reason },
      { name: "Total Warnings", value: `${warns.length}` }
    );
  await interaction.reply({ embeds: [embed] });
  sendLog(getGuildConfig, interaction.guild, "moderation", embed);

  target.send(`You were warned in **${interaction.guild.name}**: ${reason}`).catch(() => {});
}
