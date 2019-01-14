const fs = require('fs')
module.exports = () => {
	let gradle = fs.readFileSync('./android/app/build.gradle')
		.toString()
		.split(/\r\n/)

	let changes = fs.readFileSync(__dirname+'/gradleReplace.txt').toString().split(/\r\n/)

	for(let line in gradle){
		if(gradle[line].match(/rnVersion/g) && changes.length > 0){
			changes = []
		}
		if(gradle[line].match('versionCode ')){
			let split = gradle[line].split('versionCode ')
			split[split.length-1] = 'googleVer'
			gradle[line] = split.join('versionCode ')
		} else if(gradle[line].match('versionName ')){
			let split = gradle[line].split('versionName ')
			split[split.length-1] = 'userVer'
			gradle[line] = split.join('versionName ')
		}
	}

	gradle = [...gradle.slice(0, 4), ...changes, ...gradle.slice(4, 10000)].join('\r\n')

	fs.writeFileSync('./android/app/build.gradle', gradle)
	let pkg = JSON.parse(fs.readFileSync('./package.json'))
	if(!('rnVersionCode' in pkg)){
		pkg['rnVersionCode'] = 1
	}

	fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2))

	return null
}