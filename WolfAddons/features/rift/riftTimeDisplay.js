import Config from "../../config";
import { data } from "../../utils/utils";
import Skyblock from "../../../BloomCore/Skyblock";
import { getScoreboard } from "../../utils/getScoreboard";
import { handleDrag } from "../../utils/guiDragger";

let previousText;
let previousSecondsLeft = 0;
let lastUpdateTime = Date.now();

export let boxLength = 200;
const boxHeight = 12;

register("dragged", (mx, my, x, y) => {
	if (!Config.riftTimeMoveGui.isOpen()) return;
	handleDrag("riftTimeMoveGui", "riftTimeDisplay", x, y, boxLength, boxHeight);
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
		return "§3Rift Time: §4 §b10m 30s";
	}
}

register("renderOverlay", () => {
	const scale = data.riftTimeDisplay.scale || 1;
	const riftTime = getRiftTime();
	const textLength = riftTime ? Renderer.getStringWidth(riftTime) : Renderer.getStringWidth(previousText);

	boxLength = textLength + 4;

	if (Config.riftTimeMoveGui.isOpen() || (Config.moveAllGuis.isOpen() && Config.riftTimeDisplay)) {
		Renderer.translate((data.riftTimeDisplay.x || 10) - 2, (data.riftTimeDisplay.y || 10) - 3);
		Renderer.scale(scale);
		Renderer.drawRect(0xb3808080, 0, 0, boxLength, boxHeight - scale / 2);

		if (!Config.moveAllGuis.isOpen()) {
			const guiText = ["§cClick in the gray box to drag the GUI element around.", "§cUse your scroll wheel to resize it.", "", `§cCurrent element scale: ${scale.toFixed(1)}`];
			const screenMiddle = Renderer.screen.getWidth() / 2;
			Renderer.drawStringWithShadow(guiText.map((t) => ChatLib.getCenteredText(t)).join("\n"), screenMiddle - 293 / 2, 40);
		}
	}

	if ((Config.riftTimeDisplay && Skyblock.area === "The Rift") || (Config.riftTimeWarningDisplay && Skyblock.area === "The Rift" && Player.getXPLevel() <= Config.riftTimeWarningSeconds) || Config.riftTimeMoveGui.isOpen() || (Config.moveAllGuis.isOpen() && Config.riftTimeDisplay)) {
		Renderer.translate(data.riftTimeDisplay.x, data.riftTimeDisplay.y);
		Renderer.scale(scale);
		if (riftTime) {
			previousText = riftTime;
		}
		Renderer.drawStringWithShadow(previousText || "", 0, 0);
	}
});
