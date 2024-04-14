import Config from "../../config";

let isLeader = true;
let username = null;

const prefixes = [".", "!", "?"];
const commands = ["ptme", "transfer", "pt"];

register("chat", (rawMessage) => {
	if (!Config.transferCommands) return;
	if (typeof rawMessage !== "string") return;

	let parts = rawMessage.split(":");
	const username = parts[0].replace(/\[(VIP|vip\+|mvp|mvp\+|mvp\+\+)\]/gi, "").replace(/[^\w\d_]/gi, "");
	const message = parts[1].trim();

	const hasValidCommand = prefixes.some((prefix) => message.startsWith(prefix)) && commands.some((command) => message.includes(command));

	if (isLeader && hasValidCommand) {
		ChatLib.say(`/party transfer ${username}`);
	}
}).setCriteria("Party > ${rawMessage}");

register("chat", (rawMessage) => {
	if (!Config.transferCommands) return;
	if (typeof rawMessage !== "string") return;

	if (!username) username = Player.getName();
	if (rawMessage === "You are not this party's leader!") isLeader = false;
	if (rawMessage.startsWith("The party was transferred to") && rawMessage.includes(`${username} by`)) isLeader = true;
}).setCriteria("${rawMessage}");
