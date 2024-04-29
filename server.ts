import express from "express";
import next from "next";
import { Telegraf } from "telegraf";
import { prisma } from "./prisma/db";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const bot = new Telegraf(`${process.env.TELEGRAM_TOKEN}`);

const web_link = "https://base-bot-app.vercel.app/mobile/tap";

app.prepare().then(() => {
  const server = express();
  bot.start((ctx) => {
    const username = ctx.message.from.username;

    ctx.reply(
      `
    Hey, @${username}! Welcome to Base! Tap on the coin and see your balance rise.
    Base is a Decentralized Exchange on the Solana Blockchain. The biggest part of Base Token TAPS distribution will occur among the players here.
    Got friends, relatives, co-workers?
    Bring them all into the game.
    More buddies, more coins.`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Play game", web_app: { url: web_link } }],
          ],
        },
      }
    );
  });

  bot.command("referral", async (ctx) => {
    const referredBy = ctx.message.from.id;

    const referralLink = `https://t.me/thftfy?start=${referredBy}`;
    ctx.reply(`Your referral link: ${referralLink}`);
  });

  bot.launch();

  // Define custom routes or server logic here

  server.get("/api", async (req, res) => {
    res.status(200).json({
      status: "success",
     
    });
  });
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
