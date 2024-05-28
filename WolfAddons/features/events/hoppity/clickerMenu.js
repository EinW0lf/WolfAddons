import Config from "../../../config";

const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow");
const sendWindowClick = (windowId, slot, clickType, actionNumber = 0) => Client.sendPacket(new C0EPacketClickWindow(windowId ?? Player.getContainer().getWindowId(), slot, clickType ?? 0, 0, null, actionNumber));

let canClick = false;
let bestWorker = 28;
let bestCost = 0;

register("guiRender", () => {
	if (!Config.bunnyUpgrader && !Config.popupBunny) return;
	if (canClick) return;
	const container = Player.getContainer();
	if (container && container.name === "Chocolate Factory") {
		canClick = true;
		Client.scheduleTask(7, upgradeRabbit);
	}
});

const upgradeRabbit = () => {
	canClick = false;
	const container = Player.getContainer();
	if (!container || !container.name === "Chocolate Factory") return;

	const chocoData = Player.getContainer().getItems()[13];
	if (chocoData === null) return;

	const chocolate = parseInt(chocoData.getName().removeFormatting().replace(/\D/g, ""));

	if (Config.bunnyUpgrader) findWorker();
	const clickableBunny = findBunny();

	if (clickableBunny && Config.popupBunny) {
		sendWindowClick(null, clickableBunny, 0);
	} else if (bestCost <= chocolate && bestCost > 0 && Config.bunnyUpgrader) {
		sendWindowClick(null, bestWorker, 0);
		bestCost = 0;
	}
};

function findWorker() {
	const items = Player.getContainer().getItems();
	const workers = [];
	for (let i = 28; i < 35; i++) workers.push(items[i].getLore());

	let maxValue = 0;
	for (let i = 0; i < 7; i++) {
		let worker = workers[i];
		let index = worker.findIndex((line) => line === "§5§o§7Cost");
		if (index === -1) {
			continue;
		}
		let cost = parseInt(worker[index + 1].removeFormatting().replace(/\D/g, ""));
		let value = (i + 1) / cost;

		if (value > maxValue) {
			bestWorker = 28 + i;
			maxValue = value;
			bestCost = cost;
		}
	}
}

function findBunny() {
	const container = Player.getContainer();
	if (!container || !container.name === "Chocolate Factory") return null;

	const items = Player.getContainer().getItems();

	let bunnySlot = null;
	for (let i = 0; i < 26; i++) {
		if (i === 13) continue;
		if (items[i].getRegistryName() === "minecraft:skull" && items[i].getName().removeFormatting() === "CLICK ME!") {
			bunnySlot = i;
		}
	}

	return bunnySlot;
}
