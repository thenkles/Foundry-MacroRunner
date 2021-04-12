function runMacros(folder) {
    console.info(`Macro runner | Running macros from folder '${folder.titleText}'.`);

    for (let macro of folder.macros) {
        console.info(`Macro runner | Running macro '${macro.data.name}'.`);
        macro.execute();
    }

    folder.children
        .map(child => child.data)
        .forEach(runMacros);
}

Hooks.on("macroFoldersReady", function () {
    const folderName = game.settings.get("macro-runner", "macroFolderName");

    if (!folderName) {
        console.warn("Macro runner | Macro folder not specified, no macros will be run.");
        return;
    }

    const folders = Array.from(game.customFolders.macro.folders);

    const folderToRun = folders
        .map(value => value.data)
        .find(folder => folder.titleText == folderName);

    if (!folderToRun) {
        console.warn(`Macro runner | Macro folder '${folderName}' not found, no macros will be run.`);
        return;
    }

    runMacros(folderToRun);
});

Hooks.on('setup', () => {

    game.settings.register("macro-runner", 'macroFolderName', {
        name: 'Macro folder',
        hint: 'Macro folder that should be run when the game starts.',
        scope: "world",
        config: true,
        default: false,
        type: String,
        onChange: value => {
            window.location.reload();
        }
    });

});