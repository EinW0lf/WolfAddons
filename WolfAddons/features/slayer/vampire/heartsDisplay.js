import Config from "../../../config";
import { data } from "../../../utils/utils";
import { getScoreboard } from "../../../utils/getScoreboard";
import { handleDrag } from "../../../utils/guiDragger";

const boxLength = 40;
const boxHeight = 12;

register("dragged", (mx, my, x, y) => {
	if (!Config.heartsMoveGui.isOpen()) return;
	handleDrag("heartsMoveGui", "heartsDisplay", x, y, boxLength, boxHeight);
});

function getPlayerHearts() {
	const heartsLeft = Player.getHP() / 2;
	const maxHearts = Player.asPlayerMP().getMaxHP() / 2;

	const roundedNumber = (Math.round(heartsLeft * 2) / 2).toFixed(1);
	return `§c${roundedNumber.replace(".0", "")}/${maxHearts}❤`;
}

register("renderOverlay", () => {
	const scale = data.heartsDisplay.scale || 1;

	if (Config.heartsMoveGui.isOpen() || (Config.moveAllGuis.isOpen() && Config.heartsDisplay)) {
		Renderer.translate((data.heartsDisplay.x || 10) - 2, (data.heartsDisplay.y || 10) - 3);
		Renderer.scale(scale || 1);
		Renderer.drawRect(0xb3808080, 0, 0, boxLength, boxHeight - scale / 2);

		if (!Config.moveAllGuis.isOpen()) {
			const guiText = ["§cClick in the gray box to drag the GUI element around.", "§cUse your scroll wheel to resize it.", "", `§cCurrent element scale: ${scale.toFixed(1)}`];
			const screenMiddle = Renderer.screen.getWidth() / 2;
			Renderer.drawStringWithShadow(guiText.map((t) => ChatLib.getCenteredText(t)).join("\n"), screenMiddle - 293 / 2, 40);
		}
	}

	if ((Config.heartsDisplay && getScoreboard().some((name) => name === "Stillgore Château" || name === "Oubliette")) || Config.heartsMoveGui.isOpen() || (Config.moveAllGuis.isOpen() && Config.heartsDisplay)) {
		Renderer.translate(data.heartsDisplay.x, data.heartsDisplay.y);
		Renderer.scale(scale);
		Renderer.drawStringWithShadow(getPlayerHearts(), 0, 0);
	}
});
