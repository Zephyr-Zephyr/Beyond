import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { getGuildConfig, saveGuildConfig } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("set-autorole")
  .setDescription("Set (or clear) the role given to new members automatically.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addRoleOption((o) => o.setName("role").setDescription("Leave empty to disable autorole"));

export async function execute(interaction) {
  const role = interaction.options.getRole("role");
  const config = getGuildConfig(interaction.guild.id);
  config.autoroleId = role ? role.id : null;
  saveGuildConfig(interaction.guild.id, config);
  await interaction.reply({
    content: role ? `✅ Autorole set to ${role}.` : "✅ Autorole disabled.",
    ephemeral: true,
  });
}
