const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl : 'https://sonarcloud.io',
        token : process.env.SONAR_TOKEN,
        options: {
            'sonar.organization': 'navikt',
            'sonar.projectKey': 'navikt_fritak-agp-frontend',
            'sonar.sources': 'src',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
            'sonar.coverage.exclusions': '**/*.test.t*'
        }
    },
    () => process.exit()
)
