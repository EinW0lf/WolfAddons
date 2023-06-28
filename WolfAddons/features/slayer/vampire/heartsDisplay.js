import Config from "../../../config";
import { data } from "../../../utils/Utils";
import { getScoreboard } from "../../../utils/getScoreboard";
import Skyblock from "../../../../BloomCore/Skyblock";

register("dragged", (mx, my, x, y) => {
	if (!Config.heartsMoveGui.isOpen()) return;
	data.heartsDisplay.x = x;
	data.heartsDisplay.y = y;
	data.save();
});

function getPlayerHearts() {
	const hpLeft = Player.getHP();
	const heartsLeft = hpLeft / 2;
	const baseHearts = 10;
	let armorHearts = 0;

	const helmet = Player.armor.getHelmet()?.getName();
	const chestplate = Player.armor.getChestplate()?.getName();
	const leggings = Player.armor.getLeggings()?.getName();

	if (Skyblock.area === "The Rift") {
		if (helmet?.includes("Anti-Bite Scarf")) armorHearts += 1;
		if (chestplate?.includes("Lively Sepulture Chestplate")) armorHearts += 1;
		if (leggings?.includes("Leggings of the Coven")) armorHearts += 1;
	}

	const maxHearts = baseHearts + armorHearts;
	const roundedNumber = (Math.round(heartsLeft * 2) / 2).toFixed(1);
	return `§c${roundedNumber}/${maxHearts}❤`;
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
