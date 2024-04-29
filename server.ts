import express from "express";
import next from "next";
import { Telegraf } from "telegraf";
import Markup from "telegraf/markup";
import { prisma } from "./prisma/db";
import "dotenv/config";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const bot = new Telegraf(`${process.env.TELEGRAM_TOKEN}`);

const web_link = "https://base-bot-app.vercel.app/mobile/tap";

app.prepare().then(() => {
  const server = express();
  bot.start((ctx) => {
    const username = ctx.message!.from!.username;
    const welcomeMessage = `
    Hey, @${username}! Welcome to Base! Tap on the coin and see your balance rise.\nBase is a Decentralized Exchange on the Solana Blockchain. The biggest part of Base Token TAPS distribution will occur among the players here.\nGot friends, relatives, co-workers?\nBring them all into the game.\nMore buddies, more coins.
    `;
    ctx.replyWithHTML(welcomeMessage);
  });

  bot.command("help", async (ctx) => {
    ctx.reply(`Help is on the way`);
  });

  bot.command("profile", async (ctx) => {
    ctx.reply(`Profile is on the way`);
  });

  bot.command("invite", async (ctx) => {
    ctx.reply(`Invite is on the way`);
  });

  bot.command("socials", async (ctx) => {
    ctx.reply(
      `Socials is on the way`,

      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Play", web_app: { url: web_link } }],
          ],
        },
      }
    );
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
