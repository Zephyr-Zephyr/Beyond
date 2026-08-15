import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js";
import { baseEmbed } from "../../utils.js";
import { getGuildConfig, saveGuildConfig } from "../../store.js";

export const data = new SlashCommandBuilder()
  .setName("ticket-category")
  .setDescription("Manage ticket categories.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addSubcommand((sub) =>
    sub
      .setName("add")
      .setDescription("Add a ticket category")
      .addStringOption((o) => o.setName("name").setDescription("Label shown in the panel").setRequired(true))
      .addChannelOption((o) =>
        o.setName("category").setDescription("Discord category tickets are created under").addChannelTypes(ChannelType.GuildCategory).setRequired(true)
      )
      .addRoleOption((o) => o.setName("support_role").setDescription("Role that can see this ticket type").setRequired(true))
  )
  .addSubcommand((sub) =>
    sub.setName("remove").setDescription("Remove a ticket category").addStringOption((o) => o.setName("name").setDescription("Label to remove").setRequired(true))
  )
  .addSubcommand((sub) => sub.setName("list").setDescription("List configured ticket categories"));

export async function execute(interaction) {
  const sub = interaction.options.getSubcommand();
  const config = getGuildConfig(interaction.guild.id);

  if (sub === "add") {
    const name = interaction.options.getString("name", true);
    const category = interaction.options.getChannel("category", true);
    const role = interaction.options.getRole("support_role", true);
    config.ticketCategories[name] = { categoryId: category.id, supportRoleId: role.id };
    saveGuildConfig(interaction.guild.id, config);
    return interaction.reply({ content: `✅ Added ticket category **${name}**.`, ephemeral: true });
  }

  if (sub === "remove") {
    const name = interaction.options.getString("name", true);
    if (!config.ticketCategories[name]) {
      return interaction.reply({ content: `❌ No category named **${name}**.`, ephemeral: true });
    }
    delete config.ticketCategories[name];
    saveGuildConfig(interaction.guild.id, config);
    return interaction.reply({ content: `✅ Removed ticket category **${name}**.`, ephemeral: true });
  }

  // list
  const names = Object.keys(config.ticketCategories);
  const embed = baseEmbed().setTitle("🎫 Ticket Categories");
  if (names.length === 0) {
    embed.setDescription("No categories configured yet. Use `/ticket-category add`.");
  } else {
    embed.addFields(
      names.map((n) => ({
        name: n,
        value: `<#${config.ticketCategories[n].categoryId}> · <@&${config.ticketCategories[n].supportRoleId}>`,
      }))
    );
  }
  return interaction.reply({ embeds: [embed], ephemeral: true });
}
