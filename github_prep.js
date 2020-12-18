const fs = require('fs')
if (process.argv.length == 3) {

    componentName = process.argv[2];

    packageTemplate = fs.readFileSync('./package.template', 'utf8');

    package = JSON.parse(packageTemplate);


    package.name = package.name.replace(/componentname/g, componentName);
    package.repository.url = package.repository.url.replace(/componentname/g, componentName);

    fs.writeFileSync("package.json", JSON.stringify(package, null, 2));

    gitHubCommands = [
        'git init',
        'git add .',
        'git commit -m "degit from template"',
        'git branch -M main',
        `git remote add origin git@github.com:braintapper/braintapper-svelte-${componentName}.git`,
        'git push -u origin main'
    ];



    fs.writeFileSync("github_prep.bat", gitHubCommands.join("\r\n"))

    readme = fs.readFileSync("./README.template", "utf8");
    readme = readme.replace(/componentname/g, componentName);

    fs.writeFileSync("README.md", readme);

    // TODO: append README.template, package.template, github_prep.js and github_prep.bat to .gitignore



} else {
    console.log("Wrong number of arguments. Should be in the format of node generate_bat.js <componentname>");
}