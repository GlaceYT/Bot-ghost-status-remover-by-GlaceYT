const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextChannel } = require('discord.js');
const noblox = require('noblox.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] 
});

const token = process.env.TOKEN;
const clientId = '1261242922557247489';
const guildId = '1260910227155325010';
const robloxCookie = '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_ED14E21956014417FC1DA9EBB5F9A5113451F222515327365A7D06A5FC5FD90DE2DE08310DC83B525A27F673247DE3D4E6CF53B2DB745994B7793DFE529CF4AC346D4393F78EF25F3DF6A7D675BD764ABA82CF2F3E2DF5F630F7BC9D621F81602FD11D093758453A344F146598ECFB25AB6DFBDD160C6E7EEE1E1E419C47DA1FA1C264EC9C7AA43E69B0193A815C24EA981943C38E8B16F4DBB026B8073E54D4EA5B3E2BE442C873C1CAA79D837F7F88B2894A25E1F9E615AC6293839BFDDB15D5F21E235FA1F92E5C27531E39B5B05CD4B24B54A953FB99CD856F42C9EE149EE5E60E1841696184AFA6BB03925187FDEEF1FC896B69B814C9AD1594486D55A254B0A36C53EE9DD664BD59186A01EB1CE774FA7DD9281AD9996FBBCAA5DEFB53492EFD32E51124364CC78104BACE2EE765AB5C3482874CF98D7A59662CCB98B591E4F73F97D2CA9ABDE186F9D3DE0EAA0FE34D47490057C301813E2F16BAFDBA2688B6FFDFA714D3800690F9DECE2843688FC54FB3D7168A973C34EE2C3249E16D513F35E156C210918AE2CBC2FF3184589C1BC38081B5EE02DA39D6CA8B191FB5510D83EB446F7BAE9C615C9952193CEE62D2C0BBA8E53BDBDA1E8C2D510EEAEB34D99130CC0864A98496701A2E6D8C909336AC7502BA1284162D01AA605D9201019BCAF43066708C17E3C5F2F88C6394AC2517E50E45F4A011CE457219C76249FB4ED3343E894A996520D7517EFA9C93142AE8934DA4B3D6C30C496FDA433DA472C32B5C5F8F5F6E741B5B9FCB69736AC3D0B20303AD5382922F93C2FA187BE3A2CA3A6EA40CDA87C34FBC5B0F4C0D632164114EE0C1639F6D54A81BD0E29B195DA5230E138C64755863BEBDB8876ACC42D2DCE6A6956766D4EC5D93CBB15B7CDF6AFC1CDB8A68CD81F92594E93E1E566D701A995E6C6C896FD9964D33A0A86EB0C07EBBC93C3366E0EDDACDAB1822E2DF2F62EB2097B91098481B850FEAB61EEF8C61196382C4D869E721641C3340A6DDB12A16963B56002E8AE6EC8344867049F7823BADE89AF7F56C3BA423FCB0CC5905D8730B2072ECA79664312CB5DCCE3EBCB0';
const groupId = 32304173; // PRL Professional Roblox League group ID

const usedFriendlyCommand = new Set();

const statusMessages = ["Watching Over VRS", "Watching Over VRS"];
let currentIndex = 0;
const port = 3000;
const app = express();

// Express server setup
app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});

app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Powered By RTX`);
});

// Noblox setup
async function startApp() {
  await noblox.setCookie(robloxCookie);
  console.log('Logged into Roblox!');
}

startApp();

// Discord bot setup
client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity('Over VRS', { type: ActivityType.Watching });
  updateStatusAndSendMessages();
  setInterval(updateStatusAndSendMessages, 10000);
});

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  new SlashCommandBuilder().setName('freeagent')
    .setDescription('Submit a free agent application.')
    .addStringOption(option => option.setName('username').setDescription('Your username').setRequired(true))
    .addStringOption(option => option.setName('position').setDescription('Position you are applying for').setRequired(true))
    .addStringOption(option => option.setName('about').setDescription('About you').setRequired(true)),
  new SlashCommandBuilder().setName('sign')
    .setDescription('Sign a user to a team.')
    .addUserOption(option => option.setName('user').setDescription('The user to sign').setRequired(true))
    .addStringOption(option => option.setName('teamname').setDescription('The team name').setRequired(true)),
  new SlashCommandBuilder().setName('request')
    .setDescription('Request to join the league.')
    .addStringOption(option => option.setName('username').setDescription('Your username').setRequired(true))
    .addStringOption(option => option.setName('past_experiences').setDescription('Your past experiences').setRequired(true))
    .addStringOption(option => option.setName('how_did_you_find_the_league').setDescription('How did you find the league').setRequired(true)),
  new SlashCommandBuilder().setName('friendly')
    .setDescription('Post a friendly request.')
    .addStringOption(option => option.setName('team_name').setDescription('The team name').setRequired(true))
    .addStringOption(option => option.setName('information').setDescription('Information about the request').setRequired(true))
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'freeagent') {
    const username = interaction.options.getString('username');
    const position = interaction.options.getString('position');
    const about = interaction.options.getString('about');

    const embed = {
      color: 0x0099ff,
      title: 'Free Agent Application',
      fields: [
        { name: 'Username', value: username },
        { name: 'Position', value: position },
        { name: 'About Me', value: about },
      ],
      timestamp: new Date(),
      footer: {
        text: 'Free Agent Application',
      },
    };

    const channel = client.channels.cache.get('1260910228031930456');
    if (channel) {
      await channel.send({ embeds: [embed] });
      await interaction.reply({ content: 'Application submitted!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'Failed to find the specified channel.', ephemeral: true });
    }
  } else if (commandName === 'sign') {
    const user = interaction.options.getUser('user');
    const teamName = interaction.options.getString('teamname');

    const embed = {
      color: 0x00ff00,
      title: 'New Signing!',
      description: `${user} has been signed to ${teamName}!`,
      timestamp: new Date(),
      footer: {
        text: 'Team Signing',
      },
    };

    const channel = client.channels.cache.get('1260910228031930455');
    if (channel) {
      await channel.send({ embeds: [embed] });
      await interaction.reply({ content: 'Sign message sent!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'Failed to find the specified channel.', ephemeral: true });
    }
  } else if (commandName === 'request') {
    const username = interaction.options.getString('username');
    const pastExperiences = interaction.options.getString('past_experiences');
    const howDidYouFindTheLeague = interaction.options.getString('how_did_you_find_the_league');

    await interaction.deferReply({ ephemeral: true });

    const embed = {
      color: 0x0000ff,
      title: 'League Request',
      fields: [
        { name: 'Username', value: username },
        { name: 'Past Experiences', value: pastExperiences },
        { name: 'How did you find the league?', value: howDidYouFindTheLeague },
      ],
      timestamp: new Date(),
      footer: {
        text: 'League Request',
      },
    };

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('accept')
          .setLabel('✅')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId('reject')
          .setLabel('❌')
          .setStyle(ButtonStyle.Danger)
      );

    const channel = client.channels.cache.get('1260910227696390192');
    if (channel) {
      const message = await channel.send({ embeds: [embed], components: [row] });
      await interaction.editReply({ content: 'Request sent!', ephemeral: true });

      const filter = i => i.customId === 'accept' || i.customId === 'reject';
      const collector = message.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async i => {
        if (i.customId === 'accept') {
          try {
            const users = await noblox.getJoinRequests(groupId);
            const userRequest = users.data.find(user => user.requester.username === username);
            if (userRequest) {
              await noblox.handleJoinRequest(groupId, userRequest.requester.userId, true);
              await i.deferUpdate();
              await interaction.user.send('You have been accepted to the group!');
            } else {
              await i.update({ content: 'User not found in join requests.', ephemeral: true });
            }
          } catch (error) {
            console.error(error);
            await i.update({ content: 'An error occurred while accepting the request.', ephemeral: true });
          }
        } else if (i.customId === 'reject') {
          await i.deferUpdate();
          await interaction.user.send('You have been rejected from the group!');
        }
      });

      collector.on('end', collected => {
        console.log(`Collected ${collected.size} interactions.`);
      });
    } else {
      await interaction.editReply({ content: 'Failed to find the specified channel.', ephemeral: true });
    }
  } else if (commandName === 'friendly') {
    const teamName = interaction.options.getString('team_name');
    const information = interaction.options.getString('information');

    if (usedFriendlyCommand.has(interaction.user.id)) {
      await interaction.reply({ content: 'You can only use this command once every hour.', ephemeral: true });
      return;
    }

    const embed = {
      color: 0x0000ff, // Blue color
      title: 'Looking for a Friendly!',
      description: `${interaction.user} is looking for a friendly`,
      fields: [
        { name: 'Team Name', value: teamName },
        { name: 'Information', value: information },
      ],
      timestamp: new Date(),
      footer: {
        text: 'Friendly Request',
      },
    };

    const channel = client.channels.cache.get('1260910228031930458');
    if (channel) {
      await channel.send({ embeds: [embed] });
      await channel.send('<@&YOUR_ROLE_ID> ^^^^^');
      await interaction.reply({ content: 'Friendly request submitted!', ephemeral: true });

      usedFriendlyCommand.add(interaction.user.id);
      setTimeout(() => {
        usedFriendlyCommand.delete(interaction.user.id);
      }, 3600000); // 1 hour in milliseconds
    } else {
      await interaction.reply({ content: 'Failed to find the specified channel.', ephemeral: true });
    }
  }
});

client.login(token);

// Function to update status and send messages
async function updateStatusAndSendMessages() {
  if (currentIndex >= statusMessages.length) {
    currentIndex = 0;
  }

  const status = statusMessages[currentIndex];
  await client.user.setActivity(status, { type: ActivityType.Watching });
  console.log(`🤖 Bot status updated: ${status}`);
  currentIndex++;
  const channel = client.channels.cache.get('YOUR_CHANNEL_ID');
  if (channel && channel instanceof TextChannel) {
    const messagePath = path.join(__dirname, 'messages', `${currentIndex}.txt`);
    if (fs.existsSync(messagePath)) {
      const message = fs.readFileSync(messagePath, 'utf-8');
      await channel.send(message);
    }
  }
}
