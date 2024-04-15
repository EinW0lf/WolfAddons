import Config from "../../config";

const stoneRumble = new Sound({
	source: "/mineshaft.ogg",
	category: "master",
});

const mineshaftVoice = new Sound({
	source: "/mineshaft_voice.ogg",
	category: "master",
});

function playSound() {
	const type = Config.MineshaftSoundType;
	let sound = type ? mineshaftVoice : stoneRumble;

	sound.stop();
	sound.setVolume(Config.MineshaftSoundVolume / 100);
	sound.setAttenuation(0);
	sound.play();
}

register("chat", () => {
	if (Config.MineshaftTitle) {
		Client.showTitle("§4!! §cMineshaft Spawned §4!!", "", 10, 50, 10);
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

export { playSound };
