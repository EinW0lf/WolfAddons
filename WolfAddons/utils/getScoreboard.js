export function getScoreboard() {
	try {
		const scoreboard = [];

		const Lines = Scoreboard?.getLines();
		if (!Lines || Lines.length <= 0) return null;

		Lines.forEach((element) => {
			scoreboard.push(
				element
					.toString()
					.replace(/§[0-9a-fk-or]/g, "")
					.replace(/[^a-zA-Z0-9\s\u00C0-\u00FF,.:;_-]/g, "", "")
					.trim()
			);
		});
		return scoreboard;
	} catch (error) {
		return null;
	}
}
