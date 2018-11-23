const ms =require("ms");
const os = require("os-utils");
const moment = require("moment");
const Discord = require("discord.js");
const duration = require("moment-duration-format");

const config = require("./config.json");
const client = new Discord.Client();

// console log.NTE1NTIzMTMyMTcwMzA1NTM4.DtmW8A.MTk_kBZFjazcd6duLNslyf1MCM0

client.on("ready", () =>{
    console.log(`logging In \nClient: ${client.user.tag} \nUsers: ${client.users.size} \nChannels: ${client.channels.size} \nServers: ${client.guilds.size}`);
    client.user.setActivity(`!help for options`, {type: "WATCHING"});
    //client.user.setActivity(`${client.guilds.size} Servers`, {type: "WATCHING"});
});

client.on("guildCreate", guild =>{
    console.log(`New Server added \nName: ${guild.name} \nID: ${guild.id}`);
    client.user.setActivity(`!help for options`, {type: "WATCHING"});
    //client.user.setActivity(`${client.guilds.size}`, {type: "WATCHING"});
});

client.on("guildDelete", guild =>{
    console.log(`Server Removed \nName ${guild.name} \nID: ${guild.id}`);
    client.user.setActivity(`!help for options`, {type: "WATCHING"});
    //client.user.setActivity(`${client.guilds.size}`, {type: "WATCHING"});
});


// welcome message (member join)
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome'); 
    if (!channel) return;
    const embed = new Discord.RichEmbed() 
    .setColor(65280)
    .setDescription(`Hello ${member}, Welcome to **${member.guild.name}** :tada:`)
    .setFooter(`© ${client.user.username}`, client.user.displayAvatarURL)
    .setThumbnail(member.user.displayAvatarURL)
    .addField("!help - To see my all commands", `Please read the #read-me channel`)
    channel.send({embed});
  
});

// bot spam (member join)
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'bot-spam'); 
    if (!channel) return;
    const embed = new Discord.RichEmbed()
    .setColor(65280)
    .setTimestamp()
    .setDescription(`\`❯ USER JOINED \n•${member.user.tag} has joined\``)
    channel.send({embed});

});

// member leave 
client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'bot-spam'); 
    if (!channel) return;
    const embed = new Discord.RichEmbed()
    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ USER LEFT \n• ${member.user.tag} has left\``)
    channel.send({embed});
    
});

  

client.on("message", async message => {
    const prefix = (process.env.DISCORD_PREFIX);
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift();


    // commands 

    if (command === "stats") {

        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };

        const duration = moment.duration(client.uptime).format("D [days], H [hrs], m [mins], s [secs]");

        const embed = new Discord.RichEmbed()
        .setAuthor(`CLIENT INFIORMATION`, client.user.displayAvatarURL)
        .setThumbnail(client.user.displayAvatarURL)
        .setColor(65280)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()

        .addField("❯ MEMORY USAGE", `• Using : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`+
        `\n• Free : ${Math.round(os.freemem())} MB`)

        .addField('❯ LOAD AVERAGE', "• Avg : " + os.loadavg(10))

        .addField("❯ UPTIME", `• ${duration}`)

        .addField("❯ SERVER INFO", `• Users : ${client.users.size}`+
        `\n• Servers : ${client.guilds.size}`+
        `\n• Channels :  ${client.channels.size}`)

        .addField("❯ LIBRARY INFO", `• Library : [Node.js](https://nodejs.org)`+
        `\n • Discord.js : [v${Discord.version}](https://discord.js.org)`+
        `\n• Node Version : [${process.version}](https://nodejs.org)`)

        .addField("❯ OWNER INFO", `• Owner : `+
        `\n• Source Code : [View Here](https://github.com/xsuvajit/discord.js_bot)`+
        `\n• Host : [Heroku](https://heroku.com)`+
        `\n• Creation Date : ${moment(client.user.createdAt).format("DD-MM-YY, kk:mm")}`) 

        message.channel.send({embed});

    }


    else if(command === "help") {

        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };

        const embed = new Discord.RichEmbed()

        .setAuthor(`COMMANDS INFORMATION`, client.user.displayAvatarURL)
        .setColor(65280)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
        .setThumbnail(client.user.displayAvatarURL)
        .setTimestamp()
        .addField("❯ HELP", "• **!help** - It explains itself!")

        .addField("❯ INFO", `• **!stats** - It shows the bot information`+
        `\n• **!server** - It shows the server information`+
        `\n• **!user @user** - It shows the player info`+
        `\n• **!ping** - It shows the ping status`)

        .addField("❯ MOD", `• **!kick @user** - To kick a user`+
        `\n• **!ban @user** - To ban a user`+
        `\n• **!mute @user** - To mute a user for a min`+
        `\n• **!unmute @user** - To unmute a user`+
        `\n• **!verify @user** - To verify a user`+
        `\n• **!unverify @user** - To unverify a user`)

        .addField("❯ UTIL", `• **!clear** - To clear messages`+
        `\n• **!player #PLYRTAG** - It shows player info`+
        `\n• **!clan #CLNTAG** - It shows clan info`)

        .addField("❯ MEE6", `• **!rank** - It shows your rank`+
        `\n• **!levels** - It shows the position`)

        message.channel.send({embed});
    }


    else if(command === "kick") {

        if(!message.member.roles.some(r=>["Administrator", "Admin"].includes(r.name)) )
        return message.channel.send(`**${message.author.username}**: `+ "Sorry, you don't have permissions to use this!");
    
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
    
        if(!member)
        return message.channel.send(`**${message.author.username}**: `+ "Please mention a valid member of this server");
    
        if(!member.kickable) 
        return message.channel.send(`**${message.author.username}**: `+ "I cannot kick this user, check my role order");
    
        let reason = args.slice(1).join(' ');
    
        if(!reason) reason = "No reason provided";
    
        await member.kick(reason)

        .catch(error => message.channel.send(`**${message.author.username}**: `+ `Sorry, I couldn't kick because of : ${error}`));

        const embed = new Discord.RichEmbed()

        .setColor("#f32d11")
        .setTimestamp()
        .setDescription(`\`❯ USER KICKED \n• ${member.user.username} has been kicked by ${message.author.username} \n• Reason : ${reason}\``)

        client.channels.get(botcmd.id).send({embed});
    
    }


    else if(command === "ban") {

        if(!message.member.roles.some(r=>["Administrator", "Admin"].includes(r.name)) )
        return message.channel.send(`**${message.author.username}**: `+ "Sorry, you don't have permissions to use this!");
    
        let member = message.mentions.members.first();
        let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
    
        if(!member)
        return message.channel.send(`**${message.author.username}**: `+ "Please mention a valid member of this server");
    
        if(!member.bannable) 
        return message.channel.send(`**${message.author.username}**: `+ "I cannot ban this user, check my role order");
    
        let reason = args.slice(1).join(' ');
    
        if(!reason) reason = "No reason provided";
    
        await member.ban(reason)
        .catch(error => message.channel.send(`**${message.author.username}**: `+ `Sorry, I couldn't ban because of : ${error}`));

        const embed = new Discord.RichEmbed()
        
        .setColor("#f32d11")
        .setTimestamp()
        .setDescription(`\`❯ USER BANNED \n• ${member.user.username} has been banned by ${message.author.username} \n• Reason : ${reason}\``)

        client.channels.get(botcmd.id).send({embed});
    
    }


    else if(command === "mute") {


        if(!message.member.roles.some(r=>["Administrator", "Admin", "Staff"].includes(r.name)) )
        return message.channel.send(`**${message.author.username}**: `+ "Sorry, you don't have permissions to use this!");
    
        let member = message.mentions.members.first();
    
        if(!member)
        return message.channel.send(`**${message.author.username}**: `+ "Please mention a valid member of this server");

        let reason = args.slice(1).join(' ');
    
        if(!reason) reason = "No reason provided";
    
        let muteRole = message.guild.roles.find(rol => rol.name === "Muted");
    
        let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
    
        const embed = new Discord.RichEmbed()

        .setColor("#f32d11")
        .setTimestamp()
        .setDescription(`\`❯ USER MUTED \n• ${member.user.username} has been muted by ${message.author.username} \n• Reason: ${reason}\``)

        member.addRole(muteRole).then(() => {

            client.channels.get(botcmd.id).send({embed})

            .catch(error => message.channel.send(`**${message.author.username}**: `+ `Sorry, I couldn't mute because of : ${error}`));

            setTimeout( () => {

                member.removeRole(muteRole)

                const embed = new Discord.RichEmbed()

                .setColor(65280)
                .setTimestamp()
                .setDescription(`\`❯ USER UNMUTED \n• ${member.user.username} has been unmuted by ${client.user.username}\``)

                client.channels.get(botcmd.id).send({embed});

            }, 60000); // 60000 Miliseconds ===> 60 Seconds { 1 sec = 1000 ms }
    
        });
    
    }


    else if(command === "unmute") {

        if(!message.member.roles.some(r=>["Administrator", "Admin", "Staff", "Verified"].includes(r.name)) )
        return message.channel.send(`**${message.author.username}**: `+"Sorry, you don't have permissions to use this!");
    
        let member = message.mentions.members.first();
    
        if(!member)
        return message.channel.send(`**${message.author.username}**: `+ "Please mention a valid member of this server");
    
        let muteRole = message.guild.roles.find(rol => rol.name === "Muted")
    
        let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
    
        const embed = new Discord.RichEmbed()
      
        .setColor(65280)
        .setTimestamp()
        .setDescription(`\`❯ USER UNMUTED \n• ${member.user.username} has been unmuted by ${message.author.username}\``)

        member.removeRole(muteRole).then(() => {
            client.channels.get(botcmd.id).send({embed})
            .catch(error => message.channel.send(`**${message.author.username}**: `+ `Sorry, I couldn't unmute because of : ${error}`));
        });
    
    }


    else if(command === "clear") {

        const deleteCount = parseInt(args[0], 10);
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.channel.send(`**${message.author.username}**: `+"Please provide a number between 2 and 100 for the number of messages to delete");
        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send(`**${message.author.username}**: `+ `Couldn't delete messages because of: ${error}`));
    
    }


    else if(command === "say") {

        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands' & message.channel.name !== 'read-me' & message.channel.name !== 'change-log') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };

        const sayMessage = args.join(" ");
        if (!args.join(" ")) {
            return message.channel.send(`**${message.author.username}**: `+"Please provide a Message");
        };
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
    
    }


    else if(command === "player") {

        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };

        const sayMessage = args.join(" ");
        if (!args.join(" ")) {
            return message.channel.send(`**${message.author.username}**: `+"Please provide a tag");
        };
        playertag = sayMessage.toUpperCase().replace(/#/g, '').replace(/O/g, '0')
        const m = await message.channel.send(playertag);
        m.edit(`Player Details: \nhttp://kuilin.net/cc_n/member.php?tag=${playertag}`);
        const embed = new Discord.RichEmbed()
        .setColor('#1E90ff')
        .setTitle("TAP HERE TO DIRECTLY OPEN IN GAME")
        .setURL(`https://link.clashofclans.com/?action=OpenPlayerProfile&tag=${playertag}`)
        message.channel.send({embed});
    }


    else if (command === "clan") {

        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };

        const sayMessage = args.join(" ");
        if (!args.join(" ")) {
            return message.channel.send(`**${message.author.username}**: `+"Please provide a tag");
        };
        clantag = sayMessage.toUpperCase().replace(/#/g, '').replace(/O/g, '0')
        const m = await message.channel.send(clantag);
        m.edit(`Clan Details: \nhttp://kuilin.net/cc_n/clan.php?tag=${clantag}`);
        const embed = new Discord.RichEmbed()
        .setColor('#1E90ff')
        .setTitle("TAP HERE TO DIRECTLY OPEN IN GAME")
        .setURL(`https://link.clashofclans.com/?action=OpenClanProfile&tag=${clantag}`)
        message.channel.send({embed});

    }

    
    else if(command === "ping") {

        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };

        const m = await message.channel.send("ping test");
        m.edit(`Latency is: ${m.createdTimestamp - message.createdTimestamp} ms \nAPI Latency: ${Math.round(client.ping)} ms`);
    
    }


    else if (command === "server") {

        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };

        const embed = new Discord.RichEmbed()
        .setDescription(`Info about **${message.guild.name}** (ID: ${message.guild.id})`)
        .setColor(65280)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()

        .addField("❯ CHANNELS & ROLES", `• Category: ${message.guild.channels.size - message.guild.channels.filter(ch => ch.type === 'text').size - message.guild.channels.filter(ch => ch.type === 'voice').size}`+
        `\n• Total: ${message.guild.channels.filter(ch => ch.type === 'text').size + message.guild.channels.filter(ch => ch.type === 'voice').size}`+
        `\n• Text: ${message.guild.channels.filter(ch => ch.type === 'text').size}`+ 
        `\n• Audio: ${message.guild.channels.filter(ch => ch.type === 'voice').size}`+
        `\n• Roles: ${message.guild.roles.size}`)

        .addField("❯ MEMBERS", `• Total: ${message.guild.memberCount}`+
        `\n• Bots : ${message.guild.members.filter(m => m.user.bot).size}`+
        `\n• Humans: ${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}`+
        `\n• Online: ${message.guild.members.filter(m => m.presence.status === 'online').size}`)

        .addField("❯ OTHERS", `• Owner: ${message.guild.owner.user.tag}`+
        `\n• Region: ${message.guild.region.toUpperCase()}`+
        `\n• Created at: ${moment(message.guild.createdAt).format("D-MM-YY, hh:mm A")}`)
        message.channel.send({embed});

    }


    else if (command === "user") {

        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };

        let member = message.mentions.members.first();

        if(!member) {

            let bot;
            if (message.author.bot === true) {
                bot = "• User is a `Bot`";
            } else {
                bot = '';
            }

            const embed = new Discord.RichEmbed()
            .setColor(65280)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL)
            .setDescription(`Info about **${message.author.username}** (ID: ${message.author.id})`)
            
            .addField("❯ MEMBER DETAILS", `• Nickname: ${message.member.nickname !== null ? `${message.member.nickname}` : "None"}`+
            `\n• Joined at: ${moment(message.member.joinedAt).format("D-MM-YY, k:mm")}`+
            `\n• Roles: ${message.member.roles.map(roles => `\`${roles.name}\``).join(' ')}`)

            .addField("❯ USER DETAILS", `${bot !== null? `${bot}` : ""}`+
            `\n• ID: ${message.author.id}`+
            `\n• Username: ${message.author.tag}`+
            `\n• Status: \`${message.author.presence.status.toUpperCase()}\``+
            `\n• Activity: \`${message.author.presence.game ? `${message.author.presence.game.name}` : "None"}\``+
            `\n• Account created at: ${moment(message.author.createdAt).format("D-MM-YY, k:mm")}`)
        return message.channel.send({embed})};

        let bot;
        if (member.user.bot === true) {
            bot = "• User is a `Bot`";
        } else {
            bot = '';
        }

        const embed = new Discord.RichEmbed()
        .setColor(65280)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`Info about **${member.user.username}** (ID: ${member.user.id})`)

        .addField("❯ MEMBER DETAILS", `• Nickname: ${member.nickname !== null ? `${member.nickname}` : "None"}`+
        `\n• Joined at: ${moment(member.joinedAt).format("D-MM-YY, k:mm")}`+
        `\n• Roles: ${member.roles.map(roles => `\`${roles.name}\``).join(' ')}`)

        .addField("❯ USER DETAILS", `${bot !== null? `${bot}` : ""}`+
        `\n• ID: ${member.user.id}`+
        `\n• Username: ${member.user.tag}`+
        `\n• Status: \`${member.user.presence.status.toUpperCase()}\``+
        `\n• Activity: \`${member.user.presence.game ? `${member.user.presence.game.name}` : "None"}\``+
        `\n• Account created at: ${moment(member.user.createdAt).format("D-MM-YY, k:mm")}`)

        message.channel.send({embed});
    
    }


    else if(command === "verify") {

        if(!message.member.roles.some(r=>["Administrator", "Admin", "Staff"].includes(r.name)) )
        return message.channel.send(`**${message.author.username}**: `+ "Sorry, you don't have permissions to use this!");
    
        let member = message.mentions.members.first();
    
        if(!member)
        return message.channel.send(`**${message.author.username}**: `+ "Please mention a valid member of this server");
    
        let greenRole = message.guild.roles.find(rol => rol.name === "Verified")
    
        let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
    
        const embed = new Discord.RichEmbed()
      
        .setColor(65280)
        .setTimestamp()
        .setDescription(`\`❯ USER VERIFIED \n• ${member.user.username} has been verified by ${message.author.username}\``)

        member.addRole(greenRole).then(() => {
            client.channels.get(botcmd.id).send({embed})
            .catch(error => message.channel.send(`**${message.author.username}**: `+ `Sorry, I couldn't verify because of : ${error}`));
        });
    
    }


    else if(command === "unverify") {

        if(!message.member.roles.some(r=>["Administrator", "Admin", "Staff"].includes(r.name)) )
        return message.channel.send(`**${message.author.username}**: `+ "Sorry, you don't have permissions to use this!");
    
        let member = message.mentions.members.first();
    
        if(!member)
        return message.channel.send(`**${message.author.username}**: `+ "Please mention a valid member of this server");
    
        let greenRole = message.guild.roles.find(rol => rol.name === "Verified")
    
        let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
    
        const embed = new Discord.RichEmbed()
      
        .setColor("#f32d11")
        .setTimestamp()
        .setDescription(`\`❯ USER UNVERIFIED \n• ${member.user.username} has been un-verified by ${message.author.username}\``)

        member.removeRole(greenRole).then(() => {
            client.channels.get(botcmd.id).send({embed})
            .catch(error => message.channel.send(`**${message.author.username}**: `+ `Sorry, I couldn't unverify because of : ${error}`));
        });
    
    }


    else if (command === "rank") {
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };
        return;
    }


    else if (command === "levels") {
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };
        return;
    }


    // if command not found

    else {

        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");

        if (message.channel.name !== 'bot-commands') {
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam. ${channel}`);
        };

        message.channel.send(`**${message.author.username}**: `+"Command Not Found! Please do **!help**")
        
    }


});

// login details
//client.login(config.token);
client.login(process.env.DISCORD_TOKEN);
