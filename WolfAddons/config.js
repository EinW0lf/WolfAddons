import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, @PercentSliderProperty, @DecimalSliderProperty, Color } from '../Vigilance';

@Vigilant("WolfAddons", "WolfAddons", {
	getCategoryComparator: () => (a, b) => {
		const categories = ["Rift", "Slayer"];
		return categories.indexOf(a.name) - categories.indexOf(b.name);
	},
})
class Config {
	constructor() {
		this.initialize(this);
	}

	riftTimeMoveGui = new Gui();
	heartsMoveGui = new Gui();

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

	@DecimalSliderProperty({
		name: "Resize",
		description: "Resize the Rift Time Display",
		category: "Rift",
		subcategory: "Rift Time Display",
		minF: 0.1,
		maxF: 5.0,
	})
	riftTimeDisplayScale = 1.0;

	@ButtonProperty({
		name: "Move",
		description: "Move the Rift Time Display",
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
		min: 15,
		max: 300,
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
		description: "§6This Feature is WIP§r\n\nDisplays your hearts on a custom location (only active in the vampire slayer area)\n\nThis does not show any max health updates from mobs that reduce your max health, if you know how i can detect that too please contact me on discord @einwolf",
		category: "Slayer",
		subcategory: "Riftstalker Bloodfiend",
	})
	heartsDisplay = false;
	@DecimalSliderProperty({
		name: "Resize",
		description: "Resize the Hearts Overlay",
		category: "Slayer",
		subcategory: "Riftstalker Bloodfiend",
		minF: 0.1,
		maxF: 5.0,
	})
	heartsDisplayScale = 1.0;
	@ButtonProperty({
		name: "Move",
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
}

export default new Config();
