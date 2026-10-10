// this file is necessary for working the page: https://juan3178316.github.io/clcraft/list working correctly. :)
const permissionURL = "https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/commandpermissionlevel?view=minecraft-bedrock-stable";
async function readJSON(filePath = null) {
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

function GeneratePermissionName(value = null) {
	switch (value) {

		default: return `<h6 style="color: red;">Fail to find a value :(</h6>`;

		case 0:

			return `<a href="${permissionURL}#any">Any<a>`;

		case 1:

			return `<a href="${permissionURL}#gamedirectors">GameDirectors<a>`;

		case 2:

			return `<a href="${permissionURL}#admin">Admin<a>`;

		case 3:

			return `<a href="${permissionURL}#host">Host<a>`;

		case 4:

			return `<a href="${permissionURL}#owner">Owner<a>`;

	}
}

function startInnerHTML(jsonContent = {}) {
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
<h4>Command:</h4>
<h4>Properties:</h4>
<h4>Metadata</h4>
<p>• Permission level: ${GeneratePermissionName(commandList.permission_level)}</p>
<p>• Requires cheats: ${commandList.requires_cheats}</p>
<hr style="border: 2px solid gold;"></hr>
`;

		// console.log(commandList.name)
		count++
	}
	while (count < jsonContent.commands.length);

}
