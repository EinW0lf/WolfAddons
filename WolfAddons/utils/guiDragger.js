import Config from "../config";
import { data } from "./utils";

let differenceX = 0;
let differenceY = 0;
let dragging = false;

let type = null;
let latestGui = null;

function handleDrag(dragGui, displayName, x, y, boxLength, boxHeight) {
	const Gui = Config[dragGui];

	let currentX = data[displayName].x || 0;
	let currentY = data[displayName].y || 0;
	let scaling = data[displayName].scale || 1;

	Gui.registerClosed(() => {
		dragging = false;
		type = null;
		latestGui = null;

		data.save();
	});

	Gui.registerClicked(() => {
		differenceX = 0;
		differenceY = 0;
		if (dragging) {
			dragging = false;
			type = null;
		}
	});

	Gui.registerScrolled((mx, my, dir) => {
		let resizing;
		switch (dragGui) {
			case "moveAllGuis":
				resizing = latestGui;
				break;
			default:
				resizing = displayName;
		}

		if (!resizing) return;

		switch (dir) {
			case -1: // Decrease scale
				data[resizing].scale -= 0.1;
				// Ensure scale doesn't go below 0.5
				if (data[resizing].scale < 0.5) {
					data[resizing].scale = 0.5;
				}
				break;
			case 1: // Increase scale
				data[resizing].scale += 0.1;
				// Ensure scale doesn't go above 2
				if (data[resizing].scale > 6) {
					data[resizing].scale = 6;
				}
				break;
		}
	});

	if (((x >= currentX && x < currentX + boxLength * scaling && y >= currentY && y < currentY + boxHeight * scaling) || dragging) && (!type || type === displayName)) {
		const clampedX = Math.max(currentX, Math.min(x, currentX + boxLength * scaling));
		const clampedY = Math.max(currentY, Math.min(y, currentY + boxHeight * scaling));

		// Calculate difference relative to top-left corner
		if (!differenceX && !differenceY) {
			differenceX = clampedX - currentX;
			differenceY = clampedY - currentY;
			dragging = true;

			type = displayName;
			latestGui = displayName;
		}

		data[displayName].x = x - differenceX;
		data[displayName].y = y - differenceY;
	}
}

export { handleDrag };

import * as riftTimeData from "../features/rift/riftTimeDisplay";

const Guis = {
	corpse: {
		gui: "corpseMoveGui",
		config: "corpseDisplay",
		boxLength: 124,
		boxHeight: 40,
	},
	riftTime: {
		gui: "riftTimeMoveGui",
		config: "riftTimeDisplay",
		boxLength: 0,
		boxHeight: 12,
	},
	hearts: {
		gui: "heartsMoveGui",
		config: "heartsDisplay",
		boxLength: 40,
		boxHeight: 12,
	},
};

register("dragged", (mx, my, x, y) => {
	if (!Config.moveAllGuis.isOpen()) return;

	Guis.riftTime.boxLength = riftTimeData.boxLength;

	Object.keys(Guis).forEach((key) => {
		const entry = Guis[key];

		if (!Config[entry.config]) return;

		handleDrag("moveAllGuis", entry.config, x, y, entry.boxLength, entry.boxHeight);
	});
});

register("renderOverlay", () => {
	if (!Config.moveAllGuis.isOpen()) return;

	const guiText = [
		"§cClick in the gray box to drag a GUI element around.",
		"§cClick on a gui element to set it as active",
		"§cUse your scroll wheel to resize the current active gui element",
		"",
		`§cCurrently active Gui element: §b${latestGui ? latestGui : "none"}`,
		latestGui ? `§cScale: ${(data[latestGui].scale || 1).toFixed(1)}` : "",
	];

	const screenMiddle = Renderer.screen.getWidth() / 2;
	Renderer.drawStringWithShadow(guiText.map((t) => ChatLib.getCenteredText(t)).join("\n"), screenMiddle - 293 / 2, 40);
});
