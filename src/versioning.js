const fs = require('./fs')

module.exports = async (vC, vN) => {
	let pkg = JSON.parse(await fs.readFile('./package.json')),
	lock
	try {
		lock = JSON.parse(await fs.readFile('./package-lock.json'))
	} catch(err){
		// 
	}
	if(!('rnVersionCode' in pkg)){
		return console.log("Apparently you didn't use 'rn-version -i' yet")
	}
	if(vC === '+'){
		vC = pkg.rnVersionCode+1
	}
	pkg.rnVersionCode = vC
	pkg.version = vN

	if(lock){
		lock.version = vN
		await fs.writeFile('./package-lock.json', JSON.stringify(lock, null, 2))
	}
	await fs.writeFile('./package.json', JSON.stringify(pkg, null, 2))

	return null
}