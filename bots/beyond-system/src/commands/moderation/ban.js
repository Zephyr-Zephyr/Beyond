import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { baseEmbed, COLORS, canModerate, sendLog } from "../../utils.js";
import { getGuildConfig } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Ban a member from the server.")
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  .addUserOption((o) => o.setName("user").setDescription("The member to ban").setRequired(true))
  .addStringOption((o) => o.setName("reason").setDescription("Reason for the ban"))
  .addIntegerOption((o) =>
    o.setName("delete_days").setDescription("Days of messages to delete (0-7)").setMinValue(0).setMaxValue(7)
  );

export async function execute(interaction) {
  const target = interaction.options.getUser("user", true);
  const reason = interaction.options.getString("reason") ?? "No reason provided";
  const deleteDays = interaction.options.getInteger("delete_days") ?? 0;

  const targetMember = await interaction.guild.members.fetch(target.id).catch(() => null);
  const check = canModerate(interaction.member, targetMember);
  if (!check.ok) return interaction.reply({ content: `❌ ${check.reason}`, ephemeral: true });

  await interaction.guild.members.ban(target.id, { deleteMessageSeconds: deleteDays * 86400, reason });

  const embed = baseEmbed(COLORS.danger)
    .setTitle("🔨 Member Banned")
    .addFields(
      { name: "User", value: `${target.tag} (${target.id})` },
      { name: "Moderator", value: `${interaction.user}` },
      { name: "Reason", value: reason }
    );
  await interaction.reply({ embeds: [embed] });
  sendLog(getGuildConfig, interaction.guild, "moderation", embed);
}
