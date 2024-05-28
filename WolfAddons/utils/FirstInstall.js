import { data } from "./utils";

const checkFirstInstall = () => {
	if (!data.firstTime) return installCheck.unregister();
	data.firstTime = false;
	data.save();

	const msgs = ["&b&lWolfAddons", "", "&aTo get started, run the &b/wa &acommand."];
	ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`);
	msgs.forEach((a) => ChatLib.chat(ChatLib.getCenteredText(a)));
	ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`);
	installCheck.unregister();
};

const installCheck = register("tick", () => {
	checkFirstInstall();
});
