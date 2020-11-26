const fs = require('fs');

const toChange = (file, changes) => {
	const index = file.findIndex(i => i.match('import com.android.build.OutputFile'))
	if(index > -1){
		file = [...file.slice(0, index+1), ...changes, ...file.slice(index+1, file.length)]
	}
	const vCIndex = file.findIndex(i => i.match('versionCode '))
	const vNIndex = file.findIndex(i => i.match('versionName '))
	if(vCIndex > -1) {
		file[vCIndex] = file[vCIndex].replace(/versionCode.+/, 'versionCode googleVer')
	}
	if(vNIndex > -1) {
		file[vNIndex] = file[vNIndex].replace(/versionName.+/, 'versionName userVer')
	}
	return file
}



module.exports = () => {
	let gradle = fs.readFileSync('./android/app/build.gradle')
		.toString()
		.split(/\n/g)

	const bkpGradle = gradle.join('\r\n')

	let changes = fs.readFileSync(__dirname+'/gradleReplace.txt').toString().split(/\r\n/)

	gradle = toChange(gradle, changes)

	fs.writeFileSync('./android/app/build.gradle', gradle.join('\r\n'))
	fs.writeFileSync('./android/app/build.gradle.bkp', bkpGradle)

	let pkg = JSON.parse(fs.readFileSync('./package.json'))
	if(!('rnVersionCode' in pkg)){
		pkg['rnVersionCode'] = 1
	}

	fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2))

	return null
}