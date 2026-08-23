import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { sendLog, baseEmbed, COLORS } from "../../utils.js";
import { getGuildConfig } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Bulk delete recent messages.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
  .addIntegerOption((o) => o.setName("amount").setDescription("1-100").setRequired(true).setMinValue(1).setMaxValue(100))
  .addUserOption((o) => o.setName("user").setDescription("Only delete messages from this user"));

export async function execute(interaction) {
  const amount = interaction.options.getInteger("amount", true);
  const user = interaction.options.getUser("user");

  await interaction.deferReply({ ephemeral: true });

  const messages = await interaction.channel.messages.fetch({ limit: 100 });
  const pool = user ? messages.filter((m) => m.author.id === user.id) : messages;
  const targets = [...pool.values()].slice(0, amount);
  const deleted = await interaction.channel.bulkDelete(targets, true).catch(() => null);

  await interaction.editReply({
    content: `🧹 Deleted ${deleted?.size ?? 0} message(s). (Discord only allows bulk-deleting messages younger than 14 days.)`,
  });

  const embed = baseEmbed(COLORS.primary)
    .setTitle("🧹 Messages Cleared")
    .addFields(
      { name: "Channel", value: `${interaction.channel}` },
      { name: "Amount", value: `${deleted?.size ?? 0}` },
      { name: "Moderator", value: `${interaction.user}` }
    );
  sendLog(getGuildConfig, interaction.guild, "moderation", embed);
}
