import RenderLib from "../../../../RenderLib";
import Config from "../../../config";
import { getScoreboard } from "../../../utils/getScoreboard";

const name = "☠ Bloodfiend";
const refreshRate = 2;

let entities = [];

function checkWorldEntities() {
	const allEntities = World.getAllEntities();
	entities = allEntities.filter((entity) =>
		entity
			.getName()
			.replace(/§[0-9a-fk-or]/g, "")
			.includes(name)
	);
}

register("step", () => {
	if (!Config.highlightVampires || !getScoreboard().some((name) => ["Stillgore Château", "Oubliette"].includes(name))) {
		return;
	}
	checkWorldEntities();
}).setFps(refreshRate);

register("renderWorld", () => {
	if (!Config.highlightVampires || !getScoreboard().some((name) => ["Stillgore Château", "Oubliette"].includes(name))) {
		return;
	}
	for (let i = 0; i < entities.length; i++) {
		const e = entities[i];
		if (e && e.getName().includes("҉")) {
			const x = e.getRenderX();
			const y = e.getRenderY();
			const z = e.getRenderZ();

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
