import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, @PercentSliderProperty, @DecimalSliderProperty, @SelectorProperty, Color } from '../Vigilance';

@Vigilant("WolfAddons", "WolfAddons", {
	getCategoryComparator: () => (a, b) => {
		const categories = ["Misc", "Rift", "Slayer", "Mining","Events", "Party"];
		return categories.indexOf(a.name) - categories.indexOf(b.name);
	},
})
class Config {
	constructor() {
		this.initialize(this);

		this.addDependency("Rift Time Display location", "Rift Time Display");

		this.addDependency("Time left", "Rift Time Warning");
		this.addDependency("Turn Timer Red", "Rift Time Warning");
		this.addDependency("Show Rift Time Display when reaching Warn time", "Rift Time Warning");

		this.addDependency("Hearts Overlay location", "Hearts Overlay");

		this.addDependency("Steak Stake Highlight Color", "Steak Stake Highlight");

		this.addDependency("Corpse auto Announcer", "Corpse Esp");
		this.addDependency("Lapis Corpse", "Corpse auto Announcer");
		this.addDependency("Tungsten Corpse", "Corpse auto Announcer");
		this.addDependency("Umber Corpse", "Corpse auto Announcer");
		this.addDependency("Vanguard Corpse", "Corpse auto Announcer");

		this.addDependency("Mineshaft Sound Type", "Mineshaft Sound");
		this.addDependency("Mineshaft Sound Volume", "Mineshaft Sound");
		this.addDependency("Mineshaft Sound Test", "Mineshaft Sound");

		this.addDependency("Corpse Display location", "Corpse Display");
	}

	moveAllGuis = new Gui();

	riftTimeMoveGui = new Gui();
	heartsMoveGui = new Gui();
	corpseMoveGui = new Gui();

	/**
	 * Rift Category
	 */

	// Rift time Display
	@SwitchProperty({
		name: "Rift Time Display",
		description: "Displays your Rift time on your screen",
		category: "Rift",
		subcategory: "Rift Time Display",
	})
	riftTimeDisplay = false;
	@ButtonProperty({
		name: "Rift Time Display location",
		description: "Move the rift time display to a new location",
		category: "Rift",
		subcategory: "Rift Time Display",
		placeholder: "Move",
	})
	MoveRiftTimeDisplay() {
		this.riftTimeMoveGui.open();
	}

	// Rift time left warning
	@SwitchProperty({
		name: "Rift Time Warning",
		description: "Warns you when your rift time reaches a specific amount, you can define the amount of time in the slider below",
		category: "Rift",
		subcategory: "Rift Time Warning",
	})
	riftTimeWarning = false;
	@SliderProperty({
		name: "Time left",
		description: "Choose the time that should be left before getting warned in seconds",
		category: "Rift",
		subcategory: "Rift Time Warning",
		min: 30,
		max: 420,
	})
	riftTimeWarningSeconds = 60;
	@SwitchProperty({
		name: "Turn Timer Red",
		description: "This Option will make the Timer Red when reaching the time warning",
		category: "Rift",
		subcategory: "Rift Time Warning",
	})
	riftTimeDisplayColor = false;
	@SwitchProperty({
		name: "Show Rift Time Display when reaching Warn time",
		description: "Only shows the timer when reaching the time warning, wont show it while being above the time\n§cthis won't change anything if you have enabled the §4Rift Time Display§c, please disable it when you want to use this setting",
		category: "Rift",
		subcategory: "Rift Time Warning",
	})
	riftTimeWarningDisplay = false;

	/**
	 * Slayer
	 */
	@SwitchProperty({
		name: "Effigy Waypoints",
		description: "Creates a waypoint for any disabled Effigy",
		category: "Slayer",
		subcategory: "Riftstalker Bloodfiend",
	})
	effigyWaypoints = false;

	@SwitchProperty({
		name: "Hearts Overlay",
		description: "Displays your hearts on a custom location (only active in the vampire slayer area)",
		category: "Slayer",
		subcategory: "Riftstalker Bloodfiend",
	})
	heartsDisplay = false;
	@ButtonProperty({
		name: "Hearts Overlay location",
		description: "Move the Hearts Overlay",
		category: "Slayer",
		subcategory: "Riftstalker Bloodfiend",
		placeholder: "Move",
	})
	MoveHeartsDisplay() {
		this.heartsMoveGui.open();
	}

	@SwitchProperty({
		name: "Steak Stake Highlight",
		description: "Marks the Riftstalker Bloodfiend once he reaches 20% so you can kill it using the §9Steak Stake",
		category: "Slayer",
		subcategory: "Riftstalker Bloodfiend",
	})
	highlightVampires = false;

	@ColorProperty({
		name: "Steak Stake Highlight Color",
		description: "Pick a color for the Steak Stake Highlight",
		category: "Slayer",
		subcategory: "Riftstalker Bloodfiend",
	})
	steakColor = Color.RED;

	/**
	 * Mining
	 */
	@SwitchProperty({
		name: "Mineshaft Title",
		description: "Shows a Title in the middle of the screen upon spawning a mineshaft",
		category: "Mining",
		subcategory: "Glacite Tunnels",
	})
	MineshaftTitle = false;

	@SwitchProperty({
		name: "Mineshaft Sound",
		description: "Plays a sound when a mineshaft spawns",
		category: "Mining",
		subcategory: "Glacite Tunnels",
	})
	MineshaftSound = false;
	@SelectorProperty({
		name: "Mineshaft Sound Type",
		description: "Choose the type",
		category: "Mining",
		subcategory: "Glacite Tunnels",
		options: ["Stone Rumble", "Voice"],
	})
	MineshaftSoundType = 0; // Stores index of option
	@SliderProperty({
		name: "Mineshaft Sound Volume",
		description: "Adjust the volume of the sound that plays when a mineshaft spawns.\n\nTo test the sound and tile use the command §e/testmineshaft §ror §e/mineshafttest",
		category: "Mining",
		subcategory: "Glacite Tunnels",
		min: 0,
		max: 100,
	})
	MineshaftSoundVolume = 50;
	@ButtonProperty({
		name: "Mineshaft Sound Test",
		description: "Test the Sound that plays when a mineshaft spawns",
		category: "Mining",
		subcategory: "Glacite Tunnels",
		placeholder: "Play Sound",
	})
	MineshaftSoundTest() {
		import { playSound } from "./features/mining/shaft";
		playSound();
	}

	@SwitchProperty({
		name: "Corpse Esp",
		description:
			"Toggle the Corpse Waypoint (esp) feature\n\n§6This feature is basically a cheat, but it is not detectable by Hypixel, unless you send the coordinates into the chat (it's most unlikely they will actually check for that).\n§6Mining through a wall to get to a corpse is also suspicious in case a staff member spectates",
		category: "Mining",
		subcategory: "Glacite Mineshafts",
	})
	CorpseEsp = false;
	@SwitchProperty({
		name: "Corpse auto Announcer",
		description: "Automatically sends the corpse location into the Party chat\n\n§cThis feature could cause bans since this is a chat macro that announces the location of the corpse based on an esp",
		category: "Mining",
		subcategory: "Glacite Mineshafts",
	})
	CorpseAnnouncer = false;
	@SwitchProperty({
		name: "Lapis Corpse",
		description: "Toggle the auto announcer for a Lapis Corpse",
		category: "Mining",
		subcategory: "Glacite Mineshafts",
	})
	LapisCorpse = false;
	@SwitchProperty({
		name: "Tungsten Corpse",
		description: "Toggle the auto announcer for a Tungsten Corpse",
		category: "Mining",
		subcategory: "Glacite Mineshafts",
	})
	TungstenCorpse = false;
	@SwitchProperty({
		name: "Umber Corpse",
		description: "Toggle the auto announcer for a Umber Corpse",
		category: "Mining",
		subcategory: "Glacite Mineshafts",
	})
	UmberCorpse = false;
	@SwitchProperty({
		name: "Vanguard Corpse",
		description: "Toggle the auto announcer for a Vanguard Corpse",
		category: "Mining",
		subcategory: "Glacite Mineshafts",
	})
	VanguardCorpse = false;

	@SwitchProperty({
		name: "Corpse Display",
		description: "Displays the Current corpses in the mineshaft",
		category: "Mining",
		subcategory: "Glacite Mineshafts",
	})
	corpseDisplay = false;
	@ButtonProperty({
		name: "Corpse Display location",
		description: "Move the Corpse Display",
		category: "Mining",
		subcategory: "Glacite Mineshafts",
		placeholder: "Move",
	})
	MoveCorpseDisplay() {
		this.corpseMoveGui.open();
	}

	@SwitchProperty({
		name: "Cancel Crystal interaction",
		description: "Prevents you from picking up crystals in the crystal hollows. §e(basically prevents you from interacting with barriers §leverywhere§r§e)",
		category: "Mining",
		subcategory: "Crystal Hollows",
	})
	crystalCancel = false;

	/**
	 * Party
	 */
	@SwitchProperty({
		name: "Transfer command",
		description: "Allows your party members to use party transfer commands. this supports most commands of other mods. ",
		category: "Party",
		subcategory: "Commands",
	})
	transferCommands = false;

	/**
	 * Events
	 */
	@SwitchProperty({
		name: "Bunny Upgrader",
		description: "Automatically buys the bunny with the best Chocolate ratio.\n\n&c&lThis feature is considered a macro so use it at your own risk.",
		category: "Events",
		subcategory: "Chocolate Factory",
	})
	bunnyUpgrader = false;

	@SwitchProperty({
		name: "Auto Pup-Up Bunnies",
		description: "Automatically clicks on Bunnies that Pop-Up in the Chocolate Factory menu.\n\n&c&lThis feature is considered a macro so use it at your own risk.",
		category: "Events",
		subcategory: "Chocolate Factory",
	})
	popupBunny = false;

	/**
	 * Misc
	 */
	@SwitchProperty({
		name: "Update Checker",
		description: "Check for updates of the mod upon starting the game.",
		category: "Misc",
	})
	updateChecker = false;

	@ButtonProperty({
		name: "Move all Gui Elements",
		description: "Move all gui elements on the screen",
		category: "Misc",
		placeholder: "Move",
	})
	MoveAllButton() {
		this.moveAllGuis.open();
	}

	@ButtonProperty({
		name: "Discord",
		description: "Join the official discord server of WolfAddons",
		category: "Misc",
		subcategory: "Links",
		placeholder: "Join",
	})
	DiscordButton() {
		const Desktop = Java.type("java.awt.Desktop");
		const URI = Java.type("java.net.URI");
		const DiscordInvite = new URI("https://discord.gg/GuBsgv7Cmy");
		Desktop.getDesktop().browse(DiscordInvite);
	}

	@ButtonProperty({
		name: "Github",
		description: "Open the repository of WolfAddons",
		category: "Misc",
		subcategory: "Links",
		placeholder: "Open",
	})
	GithubButton() {
		const Desktop = Java.type("java.awt.Desktop");
		const URI = Java.type("java.net.URI");
		const DiscordInvite = new URI("https://github.com/EinW0lf/WolfAddons");
		Desktop.getDesktop().browse(DiscordInvite);
	}
}

export default new Config();
