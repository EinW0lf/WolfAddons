import Config from "../config";
import request from "../../requestV2";

let checked = false;
register("step", () => {
	if (checked || !Config.updateChecker) return;
	checked = true;
	request("https://raw.githubusercontent.com/EinW0lf/WolfAddons/main/versionData.json")
		.then((stuff) => {
			stuff = JSON.parse(stuff.replace(new RegExp("    ", "g"), ""));
			let metadata = JSON.parse(FileLib.read("WolfAddons", "metadata.json"));

			if (metadata.version == stuff.latestVersion) return;

			new Message(
				`&9&m${ChatLib.getChatBreak(" ")}\n`,
				new TextComponent(`&aA new version of WolfAddons is available! (&c${stuff.latestVersion}&a) Click to go to the Github release! `)
					.setClick("open_url", "https://github.com/EinW0lf/WolfAddons/releases/tag/main")
					.setHover("show_text", "&aClick to open\n&7https://github.com/EinW0lf/WolfAddons/releases/tag/main"),
				new TextComponent(`&7(Changelog)`).setHover("show_text", `&6&nChangeLog for ${stuff.latestVersion}:\n &7- ` + stuff.changelog.join("\n &7- ")),
				`\n&9&m${ChatLib.getChatBreak(" ")}`
			).chat();
		})
		.catch((error) => {
			ChatLib.chat(`&cError whilst checking for update: ${error}`);
		});
});
