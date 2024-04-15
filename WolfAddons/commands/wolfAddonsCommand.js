import Config from "../config";

export const wolfAddonsCommand = register("command", (...args) => {
	if (!args || !args[0]) return Config.openGUI();
	if (args[0] == "help") {
		let messages = [`&a&m${ChatLib.getChatBreak(" ")}`, `&b&n WolfAddons `, ` `, `&7/wa &8- Open config GUI`, `&7/rift &8- Short command for /warp wizard`, `&a&m${ChatLib.getChatBreak(" ")}`];
		messages.forEach((a) => ChatLib.chat(ChatLib.getCenteredText(a)));
		let link = "https://discord.gg/GuBsgv7Cmy";
		new Message(new TextComponent(`&a&aPlease join the Discord to suggest more features, report bugs, or just to get notified for updates`).setHover("show_text", link).setClick("open_url", link)).chat();
	}
})
	.setName("WolfAddons")
	.setAliases("wa", "wm");
