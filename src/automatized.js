const fs = require('fs')
const implementation = require('./implementation')
const versioning = require('./versioning')

module.exports = () => {
	let pkg = JSON.parse(fs.readFileSync('./package.json'))

	let vn = [...pkg.version]
	vn[0] = (parseInt(vn[0]) + 1).toString()

	vn = vn.join('')

	implementation()
	versioning('+', vn)
}