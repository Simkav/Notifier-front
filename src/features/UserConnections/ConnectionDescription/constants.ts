export enum connectionsVariation {
  Mail = "Mail",
  Discord = "Discord",
  Telegram = "Telegram",
}

export const connectionsEnum = [
  connectionsVariation.Mail,
  connectionsVariation.Discord,
  connectionsVariation.Telegram,
];

export const connectionLinks = {
  [connectionsVariation.Discord]: "https://discord.gg/yh9Mphz9HE",
  [connectionsVariation.Telegram]: "https://t.me/NotifierSimkav_bot",
};

export const botName: {
  [key in connectionsVariation]: string;
} = {
  [connectionsVariation.Discord]: "DiscordBot",
  [connectionsVariation.Telegram]: "TelegramBot",
  [connectionsVariation.Mail]: "Mail",
};
