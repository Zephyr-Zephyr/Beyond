import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { baseEmbed, COLORS, canModerate, sendLog, parseDuration } from "../../utils.js";
import { getGuildConfig } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("timeout")
  .setDescription("Timeout a member.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  .addUserOption((o) => o.setName("user").setDescription("Member to timeout").setRequired(true))
  .addStringOption((o) => o.setName("duration").setDescription("e.g. 10m, 1h, 1d (max 28d)").setRequired(true))
  .addStringOption((o) => o.setName("reason").setDescription("Reason"));

export async function execute(interaction) {
  const target = interaction.options.getUser("user", true);
  const durationInput = interaction.options.getString("duration", true);
  const reason = interaction.options.getString("reason") ?? "No reason provided";

  const ms = parseDuration(durationInput);
  const MAX = 28 * 86_400_000;
  if (!ms || ms > MAX) {
    return interaction.reply({
      content: "❌ Invalid duration. Use formats like `10m`, `1h`, `1d` (max 28d).",
      ephemeral: true,
    });
  }

  const targetMember = await interaction.guild.members.fetch(target.id).catch(() => null);
  const check = canModerate(interaction.member, targetMember);
  if (!check.ok) return interaction.reply({ content: `❌ ${check.reason}`, ephemeral: true });

  await targetMember.timeout(ms, reason);

  const embed = baseEmbed(COLORS.warning)
    .setTitle("⏱️ Member Timed Out")
    .addFields(
      { name: "User", value: `${target.tag}` },
      { name: "Duration", value: durationInput },
      { name: "Moderator", value: `${interaction.user}` },
      { name: "Reason", value: reason }
    );
  await interaction.reply({ embeds: [embed] });
  sendLog(getGuildConfig, interaction.guild, "moderation", embed);
}
