const { Telegraf } = require("telegraf");
const TOKEN = "7064449663:AAEprVm7h_IfQZFIFmZwm0aq41mfNZc6oY8";
const bot = new Telegraf(TOKEN);

const web_link = "https://base-bot-app.vercel.app/mobile/tap";

bot.start((ctx) => {
  const username = ctx.message.from.username;

  ctx.reply(`Welcome to Base @${username}`, {
    reply_markup: {
      inline_keyboard: [[{ text: "Play game", web_app: { url: web_link } }]],
    },
  });
});

bot.command('referral', async (ctx) => {
  const referredBy = ctx.message.from.id;

  const referralLink = `https://t.me/thftfy?start=${referredBy}`;
  ctx.reply(`Your referral link: ${referralLink}`);
});

bot.launch();
