// Lunaris Mini System — ticket create/close/reopen/delete logic.
// Called from events/interactionCreate.js when a ticket-related
// select menu or button is used.

import { ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { baseEmbed, COLORS } from "./utils.js";
import { getGuildConfig, saveGuildConfig } from "./store.js";

export async function createTicket(interaction, categoryName) {
  const config = getGuildConfig(interaction.guild.id);
  const category = config.ticketCategories[categoryName];
  if (!category) {
    return interaction.reply({ content: "❌ That ticket category no longer exists.", ephemeral: true });
  }

  const existing = interaction.guild.channels.cache.find(
    (c) => c.topic === `lunaris-ticket:${interaction.user.id}`
  );
  if (existing) {
    return interaction.reply({ content: `You already have an open ticket: ${existing}`, ephemeral: true });
  }

  config.ticketCounter += 1;
  saveGuildConfig(interaction.guild.id, config);

  const channel = await interaction.guild.channels.create({
    name: `ticket-${config.ticketCounter}-${interaction.user.username}`.slice(0, 90),
    type: ChannelType.GuildText,
    parent: category.categoryId,
    topic: `lunaris-ticket:${interaction.user.id}`,
    permissionOverwrites: [
      { id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel] },
      {
        id: interaction.user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
      },
      {
        id: category.supportRoleId,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
      },
    ],
  });

  const embed = baseEmbed()
    .setTitle(`🎫 ${categoryName}`)
    .setDescription(`Welcome ${interaction.user}! Describe your issue and the <@&${category.supportRoleId}> team will help you shortly.`);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("lunaris_ticket_close").setLabel("Close").setEmoji("🔒").setStyle(ButtonStyle.Secondary)
  );

  await channel.send({ content: `${interaction.user} · <@&${category.supportRoleId}>`, embeds: [embed], components: [row] });
  await interaction.reply({ content: `✅ Ticket created: ${channel}`, ephemeral: true });
}

export async function closeTicket(interaction) {
  const topic = interaction.channel.topic;
  const openerId = topic?.split(":")[1];
  if (openerId) {
    await interaction.channel.permissionOverwrites.edit(openerId, { SendMessages: false }).catch(() => {});
  }
  if (!interaction.channel.name.startsWith("closed-")) {
    await interaction.channel.setName(`closed-${interaction.channel.name}`.slice(0, 90)).catch(() => {});
  }

  const embed = baseEmbed(COLORS.warning).setDescription(`🔒 Ticket closed by ${interaction.user}.`);
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("lunaris_ticket_reopen").setLabel("Reopen").setEmoji("🔓").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("lunaris_ticket_delete").setLabel("Delete").setEmoji("🗑️").setStyle(ButtonStyle.Danger)
  );
  await interaction.reply({ embeds: [embed], components: [row] });
}

export async function reopenTicket(interaction) {
  const topic = interaction.channel.topic;
  const openerId = topic?.split(":")[1];
  if (openerId) {
    await interaction.channel.permissionOverwrites.edit(openerId, { SendMessages: true }).catch(() => {});
  }
  if (interaction.channel.name.startsWith("closed-")) {
    await interaction.channel.setName(interaction.channel.name.replace("closed-", "")).catch(() => {});
  }
  const embed = baseEmbed(COLORS.success).setDescription(`🔓 Ticket reopened by ${interaction.user}.`);
  await interaction.reply({ embeds: [embed] });
}

export async function deleteTicket(interaction) {
  await interaction.reply("🗑️ Deleting this ticket in 5 seconds...");
  setTimeout(() => interaction.channel.delete().catch(() => {}), 5000);
}
