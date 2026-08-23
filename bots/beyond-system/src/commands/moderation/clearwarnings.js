import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { clearWarns } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("clearwarnings")
  .setDescription("Clear all warnings for a member.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  .addUserOption((o) => o.setName("user").setDescription("Member").setRequired(true));

export async function execute(interaction) {
  const target = interaction.options.getUser("user", true);
  clearWarns(interaction.guild.id, target.id);
  await interaction.reply({ content: `✅ Cleared all warnings for ${target.tag}.`, ephemeral: true });
}
