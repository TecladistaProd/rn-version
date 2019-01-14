const minimist = require('minimist')
const implementation = require('./src/implementation')
const versioning = require('./src/versioning')
const automatized = require('./src/automatized')

module.exports = () => {
	const args = minimist(process.argv.slice(2))

	if(Object.keys(args).length < 2){
		console.log('If you have any questions, enter the command \'rn-version --help\'')
		return null
	} else {
		if(('i' in args || 'implement' in args) && (args.i || args['implement'])){
			implementation()
		}

		if(('h' in args || 'help' in args) && (args.h || args['help'])){
			console.log(fs.fs.readFileSync(__dirname+'/src/help.txt').toString())
		}

		if(
			('v' in args || 'version-name' in args) && (!!args.v || !!args['version-name'])
			&&
			('V' in args || 'version-code' in args) && (!!args.V || !!args['version-code'])
		){
			let a1 = args.V || args['version-code'],
			a2 = args.v || args['version-name']
			if(!a1 || !a2){
				return console.log("Be right you are passing the 2 required arguments to versioning app")
			}
			a2 = a2.toString()
			if(a2.indexOf(/./) < 0){
				a2 = a2 + '.0.0'
			}
			versioning(a1, a2)
		}

		if(('a' in args || 'automatized' in args) && (args.a || args['automatized'])){
			automatized()
		}
	}
}