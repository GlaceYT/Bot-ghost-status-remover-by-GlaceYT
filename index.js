/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
  _________ ___ ___ ._______   _________    
 /   _____//   |   \|   \   \ /   /  _  \   
 \_____  \/    ~    \   |\   Y   /  /_\  \  
 /        \    Y    /   | \     /    |    \ 
/_______  /\___|_  /|___|  \___/\____|__  / 
        \/       \/                     \/  
                    
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const express = require('express');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers // דרוש כדי להביא את כמות הממברים בשרת
  ],
});

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log('\x1b[36m[ SERVER ]\x1b[0m', '\x1b[32m SH : http://localhost:' + port + ' ✅\x1b[0m');
});

const statusMessages = ["My owner+ dev: dana2 👩‍💻 ", "Vibe & chill the best 😃"];
const statusTypes = ['dnd', 'idle'];
let currentStatusIndex = 0;
let currentTypeIndex = 0;

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log('\x1b[36m[ LOGIN ]\x1b[0m', `\x1b[32mמחובר כ: ${client.user.tag} ✅\x1b[0m`);
    console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[35mמזהה הבוט: ${client.user.id} \x1b[0m`);
    console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mמחובר ל-${client.guilds.cache.size} שרת(ים) \x1b[0m`);

    // מציג את כמות הממברים בכל שרת שהבוט מחובר אליו
    client.guilds.cache.forEach(guild => {
      console.log('\x1b[36m[ SERVER INFO ]\x1b[0m', `\x1b[32mשרת: ${guild.name} | כמות ממברים: ${guild.memberCount} \x1b[0m`);
    });

  } catch (error) {
    console.error('\x1b[31m[ ERROR ]\x1b[0m', 'נכשל להתחבר:', error);
    process.exit(1);
  }
}

function updateStatus() {
  // סופר את כמות הממברים מכל השרתים
  const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

  // יוצר סטטוס עם כמות הממברים
  client.user.setPresence({
    activities: [{ name: `${totalMembers} members | !help`, type: ActivityType.Watching }],
    status: 'online',
  });
  console.log('\x1b[33m[ STATUS ]\x1b[0m', `סטטוס עודכן ל: ${totalMembers} members | !help (Watching)`);
}

function heartbeat() {
  setInterval(() => {
    console.log('\x1b[35m[ HEARTBEAT ]\x1b[0m', `הבוט פעיל בשעה ${new Date().toLocaleTimeString()}`);
  }, 30000);
}

client.once('ready', () => {
  console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mפינג: ${client.ws.ping} מילישניות \x1b[0m`);
  updateStatus();
  setInterval(updateStatus, 10000); // עדכון הסטטוס כל 10 שניות
  heartbeat();
});

login();

  
/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
  _________ ___ ___ ._______   _________    
 /   _____//   |   \|   \   \ /   /  _  \   
 \_____  \/    ~    \   |\   Y   /  /_\  \  
 /        \    Y    /   | \     /    |    \ 
/_______  /\___|_  /|___|  \___/\____|__  / 
        \/       \/                     \/  
                    
DISCORD :  https://discord.com/invite/xQF9f9yUEM                   
YouTube : https://www.youtube.com/@GlaceYT                         
                                                                       
☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆


*/
