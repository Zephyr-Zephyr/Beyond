import { SlashCommandBuilder, PermissionFlagsBits, ChannelType, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { baseEmbed } from "../../utils.js";
import { getGuildConfig } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("ticket-panel")
  .setDescription("Post the ticket panel in a channel.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addChannelOption((o) => o.setName("channel").setDescription("Channel to post in (defaults to here)").addChannelTypes(ChannelType.GuildText));

export async function execute(interaction) {
  const config = getGuildConfig(interaction.guild.id);
  const names = Object.keys(config.ticketCategories);
  if (names.length === 0) {
    return interaction.reply({ content: "❌ No ticket categories configured yet. Use `/ticket-category add` first.", ephemeral: true });
  }

  const channel = interaction.options.getChannel("channel") ?? interaction.channel;

  const embed = baseEmbed()
    .setTitle("🎫 Support")
    .setDescription("Select a category below to open a ticket. Our team will be with you shortly.");

  const menu = new StringSelectMenuBuilder()
    .setCustomId("lunaris_ticket_create")
    .setPlaceholder("Choose a ticket category")
    .addOptions(names.slice(0, 25).map((n) => ({ label: n, value: n })));

  const row = new ActionRowBuilder().addComponents(menu);
  await channel.send({ embeds: [embed], components: [row] });
  await interaction.reply({ content: `✅ Panel posted in ${channel}.`, ephemeral: true });
}
