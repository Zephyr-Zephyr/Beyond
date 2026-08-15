// Lunaris Mini System — shared helpers used across commands and events.

import { EmbedBuilder } from "discord.js";

export const COLORS = {
  primary: 0x4f7fff,
  success: 0x59e08a,
  danger: 0xff5a5a,
  warning: 0xffcf86,
};

export function baseEmbed(color = COLORS.primary) {
  return new EmbedBuilder().setColor(color).setTimestamp().setFooter({ text: "Lunaris Mini System" });
}

// Parses durations like "10m", "1h", "1d" into milliseconds.
// Returns null if the input doesn't match a supported format.
export function parseDuration(input) {
  const match = /^(\d+)\s*(s|m|h|d)$/i.exec(input.trim());
  if (!match) return null;
  const value = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multipliers = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return value * multipliers[unit];
}

// Replaces {user}, {username}, {server}, {membercount} in welcome/leave templates.
export function fillPlaceholders(template, { user, guild }) {
  return template
    .replaceAll("{user}", `${user}`)
    .replaceAll("{username}", user.username)
    .replaceAll("{server}", guild.name)
    .replaceAll("{membercount}", `${guild.memberCount}`);
}

// Checks whether executorMember is allowed to moderate targetMember,
// based on Discord's role hierarchy (mirrors what Discord itself enforces).
export function canModerate(executorMember, targetMember) {
  if (!targetMember) return { ok: true };
  if (targetMember.id === executorMember.id) {
    return { ok: false, reason: "You can't target yourself." };
  }
  const isOwner = executorMember.guild.ownerId === executorMember.id;
  if (!isOwner && targetMember.roles.highest.position >= executorMember.roles.highest.position) {
    return { ok: false, reason: "You can't target someone with an equal or higher role than you." };
  }
  if (!targetMember.moderatable) {
    return { ok: false, reason: "I don't have permission to do that to this member — check role hierarchy." };
  }
  return { ok: true };
}

// Sends a log embed to the guild's configured log channel, if the
// specific event type is enabled. Fails silently if not configured.
export function sendLog(getGuildConfigFn, guild, eventKey, embed) {
  const config = getGuildConfigFn(guild.id);
  if (!config.logChannelId || !config.logEvents[eventKey]) return;
  const channel = guild.channels.cache.get(config.logChannelId);
  if (!channel) return;
  channel.send({ embeds: [embed] }).catch(() => {});
}
