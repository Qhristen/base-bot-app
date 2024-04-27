const { Telegraf } = require("telegraf");
const TOKEN = "7064449663:AAEprVm7h_IfQZFIFmZwm0aq41mfNZc6oY8";
const bot = new Telegraf(TOKEN);

const web_link = "https://n3nttc63-3000.uks1.devtunnels.ms/mobile/tap";

bot.start((ctx) => {
  const username = ctx.message.from.username;

  ctx.reply(`Welcome to Base @${username}`, {
    reply_markup: {
      inline_keyboard: [[{ text: "Play game", web_app: { url: web_link } }]],
    },
  });
});

bot.launch();
