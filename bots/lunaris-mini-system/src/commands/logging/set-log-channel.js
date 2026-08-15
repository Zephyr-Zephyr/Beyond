import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js";
import { getGuildConfig, saveGuildConfig } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("set-log-channel")
  .setDescription("Set the channel for moderation & activity logs.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addChannelOption((o) => o.setName("channel").setDescription("Log channel").addChannelTypes(ChannelType.GuildText).setRequired(true));

export async function execute(interaction) {
  const channel = interaction.options.getChannel("channel", true);
  const config = getGuildConfig(interaction.guild.id);
  config.logChannelId = channel.id;
  saveGuildConfig(interaction.guild.id, config);
  await interaction.reply({ content: `✅ Log channel set to ${channel}.`, ephemeral: true });
}
