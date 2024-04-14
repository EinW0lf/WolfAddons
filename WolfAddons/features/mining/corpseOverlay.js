import Config from "../../config";
import { data } from "../../utils/Utils";
import { getScoreboard } from "../../utils/getScoreboard";

function getCorpses() {
	let corpseData = [];

	tabLines = TabList.getNames();
	for (i = 0; i < tabLines.length; i++) {
		line = tabLines[i].replace(/§[0-9a-fk-or]/g, "").trim();

		if (line === "Frozen Corpses:") {
			for (let j = 1; j <= 4 && i + j < tabLines.length; j++) {
				let corpseLine = tabLines[i + j].replace(/§[0-9a-fk-or]/g, "").trim();

				if (corpseLine.endsWith("LOOTED")) {
					corpseData.push(corpseLine);
				}
			}
		}
	}

	return corpseData;
}

const colorData = {
	Lapis: "§9",
	Tungsten: "§7",
	Umber: "§6",
	Vanguard: "§b",
	LOOTED: "§a",
	"NOT LOOTED": "§c",
};

function formatCorpses() {
	const corpses = getCorpses();
	if (corpses.length > 0) {
		return corpses
			.map((c) => {
				parts = c.split(":");
				return `${colorData[parts[0]]}${parts[0]}§f: ${colorData[parts[1].trim()]}§l${parts[1].trim()}`; //I hope you have as much fun reading this line as i had coding it :P
			})
			.join("\n");
	} else {
		return ["§9Lapis§f: §a§lLOOTED", "§7Tungsten§f: §c§lNOT LOOTED", "§6Umber§f: §c§lNOT LOOTED", "§bVanguard§f: §c§lNOT LOOTED"].join("\n");
	}
}

register("dragged", (mx, my, x, y) => {
	if (!Config.corpseMoveGui.isOpen()) return;
	data.corpseDisplay.x = x;
	data.corpseDisplay.y = y;
	data.save();
});

register("renderOverlay", () => {
	if (Config.corpseMoveGui.isOpen()) {
		Renderer.translate(data.corpseDisplay.x || 0, data.corpseDisplay.y || 0);
		Renderer.scale(Config.corpseDisplayScale);
		Renderer.drawStringWithShadow(formatCorpses(), 0, 0);
	}
	if (Config.corpseDisplay && getScoreboard().some((name) => name.includes("Mineshafts"))) {
		Renderer.translate(data.corpseDisplay.x || 0, data.corpseDisplay.y || 0);
		Renderer.scale(Config.corpseDisplayScale);
		Renderer.drawStringWithShadow(formatCorpses(), 0, 0);
	} else return;
});
