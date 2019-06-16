const shell = require('shelljs')

shell.echo('##########################')
shell.echo('#     Building Angular   #')
shell.echo('##########################')

// This is where we will replace the Angular build with angular
// Then remove the public directory and replace with our dist, javascript and index.html
// This way the installer will do what it should when we run it on desktop after exe/dmg is generated.

shell.cd('angular')
const PUBLIC = '../spring/src/main/resources/public/'
shell.rm('-rf', PUBLIC);
if (shell.exec('npm run build').code !== 0) {
  shell.echo('Error: Angular build failed')
  shell.exit(1)
}
shell.cp('-R', 'dist/', PUBLIC)
shell.cd('..')

shell.echo('##########################')
shell.echo('#     Building spring    #')
shell.echo('##########################')

shell.cd('spring')
const mvnw = process.platform === 'win32' ? 'mvnw' : './mvnw'
if (shell.exec(mvnw + ' clean package').code !== 0) {
  shell.echo('Error: spring build failed')
  shell.exit(1)
}
