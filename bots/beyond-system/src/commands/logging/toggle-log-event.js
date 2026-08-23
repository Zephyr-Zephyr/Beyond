import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { getGuildConfig, saveGuildConfig } from "../../store.js";

const EVENTS = [
  { name: "Member Join", value: "memberJoin" },
  { name: "Member Leave", value: "memberLeave" },
  { name: "Message Delete", value: "messageDelete" },
  { name: "Message Edit", value: "messageEdit" },
  { name: "Moderation Actions", value: "moderation" },
  { name: "Role Changes", value: "roleChange" },
  { name: "Channel Changes", value: "channelChange" },
];

export const data = new SlashCommandBuilder()
  .setName("toggle-log-event")
  .setDescription("Turn a specific log event on or off.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addStringOption((o) => o.setName("event").setDescription("Which event").setRequired(true).addChoices(...EVENTS))
  .addBooleanOption((o) => o.setName("enabled").setDescription("On or off").setRequired(true));

export async function execute(interaction) {
  const event = interaction.options.getString("event", true);
  const enabled = interaction.options.getBoolean("enabled", true);
  const config = getGuildConfig(interaction.guild.id);
  config.logEvents[event] = enabled;
  saveGuildConfig(interaction.guild.id, config);
  const label = EVENTS.find((e) => e.value === event)?.name ?? event;
  await interaction.reply({ content: `✅ **${label}** logging is now **${enabled ? "on" : "off"}**.`, ephemeral: true });
}
