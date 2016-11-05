var Discord = require("discord.js");
var bot = new Discord.Client();
var prefix = "?" //You can change this to a prefix you like but, PLEASE DON'T USE "!"

bot.on("ready", () => {
    console.log("Bot is online and ready on " + bot.guilds.size + " servers!");
});

bot.on("message", msg => {
  channel = msg.channel;
  guild = msg.guild;

  if (msg.content.startsWith(prefix + "ping")) {
    channel.sendMessage("Do I have to say pong?");
  }

  if (msg.content.startsWith(prefix + "whoami")) {
    channel.sendMessage("You're " + msg.author.username + "!")
  }
  
  if (msg.content.startsWith(prefix + "info")) {
    channel.sendMessage("Coming Soon™")
  }
});

bot.login("BOT-TOKEN-HERE");
