import Config from "../../config";
import { data } from "../../utils/Utils";
import Skyblock from "../../../BloomCore/Skyblock";
import { getScoreboard } from "../../utils/getScoreboard";

let previousText;
let previousSecondsLeft = 0;
let lastUpdateTime = Date.now();

register("dragged", (mx, my, x, y) => {
	if (!Config.riftTimeMoveGui.isOpen()) return;
	data.riftTimeDisplay.x = x;
	data.riftTimeDisplay.y = y;
	data.save();
});

function formatTime(minutes, seconds) {
	let formattedTime = "";
	if (minutes > 0) {
		formattedTime += `${minutes}m `;
	}
	if (seconds > 0 || minutes === 0) {
		formattedTime += `${seconds}s`;
	}
	return formattedTime;
}

function getRiftTime() {
	if (Skyblock.area === "The Rift") {
		const secondsLeft = Player.getXPLevel();
		const minutes = Math.floor(secondsLeft / 60);
		const seconds = secondsLeft % 60;
		let timeDifference = secondsLeft - previousSecondsLeft;

		let specialText;
		/** Check for save zones or for the Colosseum */
		if (getScoreboard().some((name) => name === "Wizard Tower" || name === "Mirrorverse" || name === "Rift Gallery" || name === "Rift Gallery Entrance")) {
			specialText = "§a(Save Zone)";
		}

		if (getScoreboard().some((name) => name === "Colosseum")) {
			specialText = "§e(2x Slower)";
		}

		if (secondsLeft <= Config.riftTimeWarningSeconds && Config.riftTimeDisplayColor) {
			return `§3Rift Time: §4${formatTime(minutes, seconds)} ${specialText ? specialText : ""}`;
		} else {
			const currentTime = Date.now();
			const elapsedTime = currentTime - lastUpdateTime;

			if (elapsedTime >= 1000) {
				/** Only display update if at least 1 second has passed */
				previousSecondsLeft = secondsLeft;
				lastUpdateTime = currentTime;

				if (timeDifference >= 1 || timeDifference < -1) {
					const sign = timeDifference > 0 ? "§a(+" : "§4(-";
					const diffMinutes = Math.floor(Math.abs(timeDifference) / 60);
					const diffSeconds = Math.abs(timeDifference) % 60;
					return `§3Rift Time: §b${formatTime(minutes, seconds)} ${sign}${formatTime(diffMinutes, diffSeconds)}) ${specialText ? specialText : ""}`;
				} else {
					return `§3Rift Time: §b${formatTime(minutes, seconds)} ${specialText ? specialText : ""}`;
				}
			} else {
				return null; /** If less than 1 second has passed, return null to prevent updating */
			}
		}
	} else {
		return "§b10m 30s";
	}
}

register("renderOverlay", () => {
	if (Config.riftTimeMoveGui.isOpen() && (!Config.riftTimeDisplay || Skyblock.area !== "The Rift")) {
		Renderer.translate(data.riftTimeDisplay.x, data.riftTimeDisplay.y);
		Renderer.scale(Config.riftTimeDisplayScale);
		const riftTime = getRiftTime();
		if (riftTime) {
			previousText = riftTime;
			Renderer.drawStringWithShadow(riftTime, 0, 0);
		} else if (previousText) {
			Renderer.drawStringWithShadow(previousText, 0, 0);
		}
	} else if (Config.riftTimeDisplay && Skyblock.area === "The Rift") {
		Renderer.translate(data.riftTimeDisplay.x, data.riftTimeDisplay.y);
		Renderer.scale(Config.riftTimeDisplayScale);
		const riftTime = getRiftTime();
		if (riftTime) {
			previousText = riftTime;
			Renderer.drawStringWithShadow(riftTime, 0, 0);
		} else if (previousText) {
			Renderer.drawStringWithShadow(previousText, 0, 0);
		}
	} else if (Config.riftTimeWarningDisplay && Skyblock.area === "The Rift" && Player.getXPLevel() <= Config.riftTimeWarningSeconds) {
		Renderer.translate(data.riftTimeDisplay.x, data.riftTimeDisplay.y);
		Renderer.scale(Config.riftTimeDisplayScale);
		const riftTime = getRiftTime();
		if (riftTime) {
			previousText = riftTime;
			Renderer.drawStringWithShadow(riftTime, 0, 0);
		} else if (previousText) {
			Renderer.drawStringWithShadow(previousText, 0, 0);
		}
	}
});
