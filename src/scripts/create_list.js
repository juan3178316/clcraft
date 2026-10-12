// this file is necessary for working the page: https://juan3178316.github.io/clcraft/list working correctly. :)
const permissionURL = "https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/commandpermissionlevel?view=minecraft-bedrock-stable";
const fileURL = "https://raw.githubusercontent.com/Mojang/bedrock-samples/refs/heads/main/metadata/command_modules/mojang-commands.json";

async function qFileURL(filePath) {
	try {
		let cached = localStorage.getItem("json-cache");
		if (cached) {
			let { data, timestamp } = JSON.parse(cached);
			if (Date.now() - timestamp < 216e5) {
				return startInnerHTML(data);
			}
		}
		let request = await fetch(filePath, { cache: "default" });
		let queries = await request.json();
		localStorage.setItem("json-cache", JSON.stringify({ data: queries, timestamp: Date.now() }));
		return startInnerHTML(queries);
	}
	catch (e) {
		console.error('Error to read JSON file: ', e);
		let cached = localStorage.getItem("json-cache");
		if (cached) {
			console.warn('Loading expired cache');
			return startInnerHTML(JSON.parse(cached).data);
		}
	}
}

function startInnerHTML(JSONData) {
	let count = 0;
	let setCommands = document.getElementById('command-generator');
	do {
		let cmdId = JSONData.commands[count];
		let setDiv = document.createElement('div');
		setDiv.setAttribute('id', `command-${count}`);
		setCommands.appendChild(setDiv);

		document.getElementById(`command-${count}`).innerHTML = `
<h2>${cmdId.name}</h2>
<p>${cmdId.description}</p>
<h4>Command:</h4>
<p>/${cmdId.name} test changelog</p>
<h4>Properties:</h4>
<h4>Metadata</h4>
<p>• Permission level: ${loadPermissionsRule(cmdId.permission_level)}</p>
<p>• Requires cheats: ${cmdId.requires_cheats ? '<p style="color: red">true</p>' : '<p style="color: lime">false</p>'}</p>
<hr style="border: 2px solid gold;"></hr>
`;

		// console.log(commandList.name)
		count++
	}
	while (count < JSONData.commands.length);

}

function loadPermissionsRule(value) {
	let categories = value;
	switch (categories) {
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

qFileURL(fileURL);