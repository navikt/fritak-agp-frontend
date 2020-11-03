const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsPath) {
    const miljo = process.env.NAIS_CLUSTER_NAME || 'local';
    fsExtra.ensureFile(settingsPath).then(f => {
        fsExtra.writeFileSync(
            settingsPath,
            `window.appSettings = {
                MILJO: '${miljo}',
            };`
        );
    });
}

module.exports = createEnvSettingsFile;
