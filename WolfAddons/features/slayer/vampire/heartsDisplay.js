import Config from "../../../config";
import { data } from "../../../utils/Utils";
import { getScoreboard } from "../../../utils/getScoreboard";

register("dragged", (mx, my, x, y) => {
	if (!Config.heartsMoveGui.isOpen()) return;
	data.heartsDisplay.x = x;
	data.heartsDisplay.y = y;
	data.save();
});

function getPlayerHearts() {
	const heartsLeft = Player.getHP() / 2;
	const maxHearts = Player.asPlayerMP().getMaxHP() / 2;

	const roundedNumber = (Math.round(heartsLeft * 2) / 2).toFixed(1);
	return `§c${roundedNumber.replace(".0", "")}/${maxHearts}❤`;
}

register("renderOverlay", () => {
	if (Config.heartsMoveGui.isOpen()) {
		Renderer.translate(data.heartsDisplay.x, data.heartsDisplay.y);
		Renderer.scale(Config.heartsDisplayScale);
		Renderer.drawStringWithShadow(getPlayerHearts(), 0, 0);
	}
	if (Config.heartsDisplay && getScoreboard().some((name) => name === "Stillgore Château" || name === "Oubliette")) {
		Renderer.translate(data.heartsDisplay.x, data.heartsDisplay.y);
		Renderer.scale(Config.heartsDisplayScale);
		Renderer.drawStringWithShadow(getPlayerHearts(), 0, 0);
	} else return;
});
