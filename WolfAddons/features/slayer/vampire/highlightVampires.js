import RenderLib from "../../../../RenderLib";
import Config from "../../../config";
import { getScoreboard } from "../../../utils/getScoreboard";

let name = "☠ Bloodfiend";
let refreshRate = 2; // keep it low for now, so it does not create useless lag (still scans each mob 2x a second)

let entities = [];

function checkWorldEntities() {
	let allEntities = World.getAllEntities();
	entities = [];
	for (let i = 0; i < allEntities.length; i++) {
		if (
			allEntities[i]
				.getName()
				.replace(/§[0-9a-fk-or]/g, "")
				.includes(name)
		) {
			// if (allEntities[i].isInvisible()) return;
			entities.push(allEntities[i]);
			// console.log(allEntities[i]);
		}
	}
}

register("step", () => {
	if (!Config.highlightVampires || !getScoreboard().some((name) => ["Stillgore Château", "Oubliette"].includes(name))) return;
	checkWorldEntities();
}).setFps(refreshRate);

register("renderWorld", () => {
	if (!Config.highlightVampires || !getScoreboard().some((name) => ["Stillgore Château", "Oubliette"].includes(name))) return;
	for (let i = 0; i < entities.length; i++) {
		e = entities[i];
		if (e && e.getName().includes("҉")) {
			let x = e.getRenderX();
			let y = e.getRenderY();
			let z = e.getRenderZ();
			//  (x, y, z, w, h, red, green, blue, alpha, phase)
			RenderLib.drawInnerEspBox(x, y - 2, z, 0.8, 1.9, 255, 0, 0, 0.5, false);
		} else {
			entities.splice(i, 1);
		}
	}
});
