import RenderLib from "../../../RenderLib";
import { getScoreboard } from "../../utils/getScoreboard";

const name = "ൠ";
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
	if (!getScoreboard().some((name) => name.includes("The Garden"))) {
		return;
	}
	checkWorldEntities();
}).setFps(refreshRate);

register("renderWorld", () => {
	if (!getScoreboard().some((name) => name.includes("The Garden"))) {
		return;
	}
	for (let i = 0; i < entities.length; i++) {
		const e = entities[i];
		if (e && e.getName().includes("ൠ")) {
			const x = e.getRenderX();
			const y = e.getRenderY();
			const z = e.getRenderZ();

			//  (x, y, z, w, h, red, green, blue, alpha, phase)
			RenderLib.drawEspBox(x, y - 0.33, z, 0.66, 0.66, 255, 0, 0, 1, true);
		} else {
			entities.splice(i, 1);
		}
	}
});
