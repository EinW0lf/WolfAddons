import { data } from "./Utils";

const checkFirstInstall = () => {
	if (!data.firstTime) return;
	data.firstTime = false;
	data.save();

	const msgs = ["&b&lWolfAddons", "", "&aTo get started, run the &b/WolfAddons &acommand."];
	ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`);
	msgs.forEach((a) => ChatLib.chat(ChatLib.getCenteredText(a)));
	ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`);
};

register("tick", () => {
	checkFirstInstall();
});
