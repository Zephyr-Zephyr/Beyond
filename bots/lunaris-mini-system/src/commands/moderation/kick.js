import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { baseEmbed, COLORS, canModerate, sendLog } from "../../utils.js";
import { getGuildConfig } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Kick a member from the server.")
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  .addUserOption((o) => o.setName("user").setDescription("The member to kick").setRequired(true))
  .addStringOption((o) => o.setName("reason").setDescription("Reason for the kick"));

export async function execute(interaction) {
  const target = interaction.options.getUser("user", true);
  const reason = interaction.options.getString("reason") ?? "No reason provided";

  const targetMember = await interaction.guild.members.fetch(target.id).catch(() => null);
  const check = canModerate(interaction.member, targetMember);
  if (!check.ok) return interaction.reply({ content: `❌ ${check.reason}`, ephemeral: true });

  await targetMember.kick(reason);

  const embed = baseEmbed(COLORS.warning)
    .setTitle("👢 Member Kicked")
    .addFields(
      { name: "User", value: `${target.tag} (${target.id})` },
      { name: "Moderator", value: `${interaction.user}` },
      { name: "Reason", value: reason }
    );
  await interaction.reply({ embeds: [embed] });
  sendLog(getGuildConfig, interaction.guild, "moderation", embed);
}
