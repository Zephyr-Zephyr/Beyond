import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js";
import { getGuildConfig, saveGuildConfig } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("set-leave")
  .setDescription("Configure the leave message.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addChannelOption((o) => o.setName("channel").setDescription("Channel for leave messages").addChannelTypes(ChannelType.GuildText).setRequired(true))
  .addStringOption((o) => o.setName("message").setDescription("Use {user}, {username}, {server}, {membercount}"))
  .addBooleanOption((o) => o.setName("enabled").setDescription("Turn leave messages on/off"));

export async function execute(interaction) {
  const channel = interaction.options.getChannel("channel", true);
  const message = interaction.options.getString("message");
  const enabled = interaction.options.getBoolean("enabled");

  const config = getGuildConfig(interaction.guild.id);
  config.leave.channelId = channel.id;
  if (message) config.leave.message = message;
  config.leave.enabled = enabled ?? true;
  saveGuildConfig(interaction.guild.id, config);

  await interaction.reply({
    content: `✅ Leave messages ${config.leave.enabled ? "enabled" : "disabled"} in ${channel}.`,
    ephemeral: true,
  });
}
