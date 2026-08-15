import { Events } from "discord.js";
import { createTicket, closeTicket, reopenTicket, deleteTicket } from "../tickets.js";

export const name = Events.InteractionCreate;

export async function execute(interaction) {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      const payload = { content: "❌ Something went wrong running that command.", ephemeral: true };
      if (interaction.replied || interaction.deferred) await interaction.followUp(payload).catch(() => {});
      else await interaction.reply(payload).catch(() => {});
    }
    return;
  }

  if (interaction.isStringSelectMenu() && interaction.customId === "lunaris_ticket_create") {
    return createTicket(interaction, interaction.values[0]);
  }

  if (interaction.isButton()) {
    if (interaction.customId === "lunaris_ticket_close") return closeTicket(interaction);
    if (interaction.customId === "lunaris_ticket_reopen") return reopenTicket(interaction);
    if (interaction.customId === "lunaris_ticket_delete") return deleteTicket(interaction);
  }
}
