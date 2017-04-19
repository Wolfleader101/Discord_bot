// feel free to remove and commands you don't want. This is a good skeleton for you to start your code though :)
/*
#######################
# 					  #
#  DISCORD BOT CODE   #
#        By 	      #
#     Wolfleader      #
#      V1.0.0         #
#                     #
#######################
*/
const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require("./config.json");

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on('message', message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);

    if (command === 'add') {
        let numArray = args.map(n=> parseInt(n));
        let total = numArray.reduce( (p, c) => p+c);
        message.channel.sendMessage(total);
    }

    if (command === 'say') {
        message.channel.sendMessage(args.join(" "));
    }

  if (command === 'ping') {
    message.channel.sendMessage('pong');
  } else

  if (command === 'foo') {
    if(message.member.roles.exists("name", "Admin") || message.member.roles.exists("name", "OWNER")) {
          message.channel.sendMessage('bar').catch(console.error);
      } else {
          message.reply("***You do not have the permissions to use this command!*** **You must be `Admin` or above!**").catch(console.error);
      }
  }

if (command === "kick") {
      if(!(message.member.roles.exists("name", "Admin") || message.member.roles.exists("name", "ＯＷＮＥＲ"))){
          return message.reply("***You do not have the permissions to use this command!*** **You must be `Admin` or above!**").catch(console.error);
      }
      if (message.mentions.users.first() === undefined) {
          return message.reply("Please mention a user to kick").catch(console.error);
      }
      let kickMember = message.guild.member(message.mentions.users.first());
      if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
         return message.reply("I dont have these permissions (KICK_MEMBERS) to do this!").catch(console.error);
     }
     kickMember.kick().then(member => {
         message.reply(`${member.user.username} was successfully kicked!`)
     }).catch(e => {
         console.error(e);
     });
  }

  if (command === "eval") {
      if(message.author.id !== "242146442783752192") return;
      try {
          var code = args.join(" ");
          var evaled = eval(code);

          if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

          message.channel.sendCode("x1", clean(evaled));
      } catch(err) {
          message.channel.sendMessage(`\`ERROR\` \`\`\`x1\n${clean(err)}\n\`\`\``);
      }
  }

}); // END MESSAGE HANDLER

function clean(text) {
    if (typeof(text) === "String")
    return text.replace(/`/g, "`" + string.fromCharCode(8203)).replace(/@/g, "@" + string.fromCharCode(8203));
    else
        return text;
}

bot.login(config.token);