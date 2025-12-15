// this file is necessary for working the page: https://juan3178316.github.io/clcraft/list working correctly. :)
async function readJSON(filePath) {
	try {
		const request = await fetch(filePath);
		const queries = await request.json();
		return startInnerHTML(queries);
	}
	catch (error) {
		console.error('Error to read JSON file: ', error);
	}
}

readJSON('https://raw.githubusercontent.com/Mojang/bedrock-samples/refs/heads/main/metadata/command_modules/mojang-commands.json');

function startInnerHTML(jsonContent) {
	let count = 0;
	const setCommands = document.getElementById('command-generator');
	do {
		let commandList = jsonContent.commands[count];
		generateCommands = document.createElement('div');
		let setDiv = document.createElement('div');
		setDiv.setAttribute('id', `command-${count}`);
		setCommands.appendChild(setDiv);

		document.getElementById(`command-${count}`).innerHTML = `
<h2>${commandList.name}</h2>
<p>${commandList.description}</p>
<4>Properties:</h3>
<p>• Requires cheats: ${commandList.requires_cheats}</p>
<h4>Command:</h4>
<hr style="border: 2px solid gold;"></hr>
`;

		// console.log(commandList.name)
		count++
	}
	while (count < jsonContent.commands.length);
}