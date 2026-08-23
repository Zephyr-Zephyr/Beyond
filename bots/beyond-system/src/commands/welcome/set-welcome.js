import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js";
import { getGuildConfig, saveGuildConfig } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("set-welcome")
  .setDescription("Configure the welcome message.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addChannelOption((o) => o.setName("channel").setDescription("Channel for welcome messages").addChannelTypes(ChannelType.GuildText).setRequired(true))
  .addStringOption((o) => o.setName("message").setDescription("Use {user}, {username}, {server}, {membercount}"))
  .addBooleanOption((o) => o.setName("enabled").setDescription("Turn welcome messages on/off"));

export async function execute(interaction) {
  const channel = interaction.options.getChannel("channel", true);
  const message = interaction.options.getString("message");
  const enabled = interaction.options.getBoolean("enabled");

  const config = getGuildConfig(interaction.guild.id);
  config.welcome.channelId = channel.id;
  if (message) config.welcome.message = message;
  config.welcome.enabled = enabled ?? true;
  saveGuildConfig(interaction.guild.id, config);

  await interaction.reply({
    content: `✅ Welcome messages ${config.welcome.enabled ? "enabled" : "disabled"} in ${channel}.`,
    ephemeral: true,
  });
}
