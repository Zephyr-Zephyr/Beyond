import { SlashCommandBuilder } from "discord.js";
import { baseEmbed } from "../../utils.js";

export const data = new SlashCommandBuilder().setName("help").setDescription("Show all available commands.");

export async function execute(interaction) {
  const embed = baseEmbed()
    .setTitle("🌙 Lunaris Mini System — Commands")
    .setDescription("The central bot of Lunaris Mini. More modules are added over time.")
    .addFields(
      { name: "🤖 Core", value: "`/help` `/ping` `/about` `/serverinfo` `/userinfo`" },
      { name: "🛡️ Moderation", value: "`/ban` `/kick` `/timeout` `/warn` `/warnings` `/clearwarnings` `/clear`" },
      { name: "🎫 Tickets", value: "`/ticket-panel` `/ticket-category`" },
      { name: "📋 Logging", value: "`/set-log-channel` `/toggle-log-event`" },
      { name: "👋 Welcome", value: "`/set-welcome` `/set-leave` `/set-autorole`" }
    );
  await interaction.reply({ embeds: [embed] });
}
