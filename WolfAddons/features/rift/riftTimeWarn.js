import Config from "../../config";
import Skyblock from "../../../BloomCore/Skyblock";

let titleShown = false;

register("tick", () => {
	if (Config.riftTimeWarning && Skyblock.area === "The Rift" && Player.getXPLevel() <= Config.riftTimeWarningSeconds && !titleShown) {
		const secondsLeft = Player.getXPLevel();
		const minutes = Math.floor(secondsLeft / 60);
		const seconds = secondsLeft % 60;

		let text = "§4You only have";
		if (minutes > 0) {
			text += ` ${minutes} minute${minutes > 1 ? "s" : ""}`;
		}
		if (seconds > 0) {
			text += ` ${seconds} second${seconds > 1 ? "s" : ""}`;
		}
		text += " of Rift Time left";

		Client.showTitle(text, "", 10, 40, 10);

		titleShown = true;
	} else if (Skyblock.area !== "The Rift" && titleShown) {
		titleShown = false;
	} else return;
});
