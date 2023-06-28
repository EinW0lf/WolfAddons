import RenderLib from "../../../../RenderLib";
import Config from "../../../config";
import { getScoreboard } from "../../../utils/getScoreboard";

let name = "☠ Bloodfiend";
let refreshRate = 2;

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
			entities.push(allEntities[i]);
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

			const color = Config.steakColor;
			const r = color.getRed();
			const g = color.getGreen();
			const b = color.getBlue();
			const a = (color.getAlpha() & 0xff) / 255.0;

			//  (x, y, z, w, h, red, green, blue, alpha, phase)
			RenderLib.drawInnerEspBox(x, y - 2, z, 0.8, 1.9, r, g, b, a.toFixed(2), false);
		} else {
			entities.splice(i, 1);
		}
	}
});
