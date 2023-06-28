import Config from "../../../config";
import { getScoreboard } from "../../../utils/getScoreboard.js";
import renderBeaconBeam from "../../../../BeaconBeam/index.js";

const waypoints = {
	0: { x: 150, y: 73, z: 95 },
	1: { x: 193, y: 87, z: 119 },
	2: { x: 235, y: 104, z: 147 },
	3: { x: 293, y: 90, z: 134 },
	4: { x: 262, y: 93, z: 94 },
	5: { x: 240, y: 124, z: 118 },
};

function extractPositions(effigyString) {
	const effigies = effigyString.replace(/🍭/g, "").replace("Effigies: ", "");

	const regex = /(?=§[c7]⧯)/g;
	const splitArray = effigies.split(regex);

	const numberedArray = splitArray.map((segment, index) => `${segment}`);

	return numberedArray;
}

register("renderWorld", () => {
	if (Config.effigyWaypoints && getScoreboard().some((name) => ["Stillgore Château", "Oubliette"].includes(name))) {
		Scoreboard.getLines().forEach((element) => {
			if (element.toString().includes("Effigies:")) {
				const result = extractPositions(element.toString());

				result.forEach((segment, index) => {
					if (segment.startsWith("§7⧯")) {
						const { x, y, z } = waypoints[index];

						Tessellator.drawString(`Disabled Effigy`, x + 0.5, y + 3.5, z + 0.5, 0xff0000, true, 1, true);
						renderBeaconBeam(x, y, z, 1, 0, 0, 0.6, true);
					}
				});
			}
		});
	}
});
