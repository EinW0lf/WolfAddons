import Config from "../config";
import request from "../../requestV2";

// Credits for the update checker logic go to UnclaimedBloom6.
// This code has been modified to check for strict version comparison
// and ensure that only older versions trigger the update notification.

let checked = false;
const checker = register("tick", () => {
	if (checked || !Config.updateChecker) return checker.unregister();
	checked = true;
	request("https://raw.githubusercontent.com/EinW0lf/WolfAddons/main/versionData.json")
		.then((stuff) => {
			stuff = JSON.parse(stuff.replace(new RegExp("    ", "g"), ""));
			let metadata = JSON.parse(FileLib.read("WolfAddons", "metadata.json"));

			if (isNewerVersion(stuff.latestVersion, metadata.version)) {
				new Message(
					`&9&m${ChatLib.getChatBreak(" ")}\n`,
					new TextComponent(`&aA new version of WolfAddons is available! (&c${stuff.latestVersion}&a) Click to go to the Github release! `).setClick("open_url", "https://github.com/EinW0lf/WolfAddons").setHover("show_text", "&aClick to open\n&7https://github.com/EinW0lf/WolfAddons"),
					new TextComponent(`&7(Changelog)`).setHover("show_text", `&6&nChangeLog for ${stuff.latestVersion}:\n &7- ` + stuff.changelog.join("\n &7- ")),
					`\n&9&m${ChatLib.getChatBreak(" ")}`
				).chat();
			}

			checker.unregister();
		})
		.catch((error) => {
			ChatLib.chat(`&cError whilst checking for update: ${error}`);
			checker.unregister();
		});
});

function isNewerVersion(latestVersion, currentVersion) {
	const latestParts = latestVersion.split(".").map(Number);
	const currentParts = currentVersion.split(".").map(Number);

	for (let i = 0; i < latestParts.length; i++) {
		if (latestParts[i] > currentParts[i]) {
			return true;
		} else if (latestParts[i] < currentParts[i]) {
			return false; // Current version is actually newer
		}
	}

	return false; // Versions are identical
}
