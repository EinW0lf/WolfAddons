import Config from "../../config";

register("playerInteract", (interaction, target, event) => {
	if (!Config.crystalCancel) return;
	if (interaction.toString() != "RIGHT_CLICK_BLOCK") return;
	const block = Player.lookingAt()?.type?.getRegistryName();
	if (block === "minecraft:barrier") {
		ChatLib.chat(`§cBarrier interaction blocked by WolfAddons`);
		cancel(event);
	}
});
