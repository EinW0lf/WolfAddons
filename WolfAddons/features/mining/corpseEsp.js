import RenderLib from "../../../RenderLib";
import Config from "../../config";
import { getScoreboard } from "../../utils/getScoreboard";
import renderBeaconBeam from "../../../BeaconBeam/index.js";

const name = "Armor Stand";
const refreshRate = 1;

let entitiesWithBoots = [];
let isInMineshaft = false;
let entities = [];
let announcedCorpses = [];

function checkWorldEntities() {
	const allEntities = World.getAllEntities();
	entities = allEntities.filter((entity) =>
		entity
			.getName()
			.replace(/§[0-9a-fk-or]/g, "")
			.includes(name)
	);
}

function checkMineshaft() {
	isInMineshaft = getScoreboard().some((name) => name.includes("Mineshafts"));
}

function updateEntitiesWithBoots() {
	entitiesWithBoots = entities.filter((entity) => {
		const item = new EntityLivingBase(entity.getEntity()).getItemInSlot(1);
		if (item) {
			const bootsString = JSON.stringify(item.getNBT().toObject(), "", 4);
			const boots = JSON.parse(bootsString);
			return Object.keys(colorData).includes(boots.tag.ExtraAttributes.id);
		}
		return false;
	});
}

register("step", () => {
	if (!Config.CorpseEsp) return;
	checkMineshaft();
	if (isInMineshaft) {
		checkWorldEntities();
		updateEntitiesWithBoots();
	} else {
		entitiesWithBoots = [];
	}
}).setFps(refreshRate);

register("renderWorld", () => {
	if (!Config.CorpseEsp) return;
	if (!isInMineshaft || entitiesWithBoots.length === 0) {
		return;
	}

	entitiesWithBoots.forEach((entity) => {
		const x = entity.getRenderX();
		const y = entity.getRenderY();
		const z = entity.getRenderZ();
		const item = new EntityLivingBase(entity.getEntity()).getItemInSlot(1);
		if (item) {
			const bootsString = JSON.stringify(item.getNBT().toObject(), "", 4);
			const boots = JSON.parse(bootsString);
			const colors = colorData[boots.tag.ExtraAttributes.id];
			const check = `${colors.type}-${Math.floor(x)}, y: ${Math.floor(y)}, z: ${Math.floor(z)}`;
			if (announcedCorpses.indexOf(check) < 0) {
				announcedCorpses.push(check);
				const clickableMessage = new Message(new TextComponent(`§l!!Found Corpse!!§r Type: ${colors.color}${colors.type}§r\n§eClick on the message to send it in party chat`).setClick("run_command", `/party chat x: ${Math.floor(x)}, y: ${Math.floor(y)}, z: ${Math.floor(z)} ${colors.type}`));
				ChatLib.chat(clickableMessage);
			}
			RenderLib.drawEspBox(x, y, z, 1, 1, colors.r, colors.g, colors.b, 1, true);
			Tessellator.drawString(colors.type, x, y + 0.5, z, colors.hex, true, 1, true);
			renderBeaconBeam(x - 0.5, y, z - 0.5, colors.r, colors.g, colors.b, 0.4, false);
		}
	});
});

const colorData = {
	LAPIS_ARMOR_BOOTS: { color: "§9", r: 0, g: 0, b: 200, hex: 0x0000c8, type: "Lapis" },
	MINERAL_BOOTS: { color: "§7", r: 0, g: 0, b: 0, hex: 0x000000, type: "Tungsten" },
	ARMOR_OF_YOG_BOOTS: { color: "§6", r: 255, g: 170, b: 0, hex: 0xffaa00, type: "Umber" },
	VANGUARD_BOOTS: { color: "§b", r: 85, g: 255, b: 255, hex: 0x55ffff, type: "Vanguard" },
};
