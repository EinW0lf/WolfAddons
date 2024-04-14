import Config from "../../config";

const caveSound = new Sound({
	source: "/mineshaft.ogg",
});

function playSound() {
	caveSound.setVolume(Config.MineshaftSoundVolume / 100);
	caveSound.play();
}

register("chat", () => {
	if (Config.MineshaftTitle) {
		Client.showTitle("§4!! §cMineshaft Spawned §4!!", "", 10, 30, 10);
	}
	if (Config.MineshaftSound) {
		playSound();
	}
}).setCriteria("WOW! You found a Glacite Mineshaft portal!");

export const testMineshaftCommand = register("command", (...args) => {
	ChatLib.chat("§5§lWOW! §r§aYou found a §bGlacite Mineshaft §aportal! §7(This is a test)");
	Client.showTitle("§4!! §cMineshaft Spawned §4!!", "", 10, 30, 10);
	playSound();
})
	.setName("testmineshaft")
	.setAliases("mineshafttest");
