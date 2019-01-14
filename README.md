# RN-VERSION

## What is it ?

A cli node module to turn easy versionate apps created with react-native-cli

### How to use

It's simple:

install the module using global flag

`npm install -g rn-version`

go to react-native project folder in terminal and type

`rn-version --implementation`

this command will generate automatically in your react-native code, the code to facility versioning.

And to versionate just use this command in terminal

`rn-version --version-code 1 --version-name 1.0.0`

to automatized version, just try

`rn-version --automatized`

### Commands Help

`--help or -h`  This command will detail the other commands in terminal

`--implementation or -i` This command will implement the necessary code to the module work in your react-native project

`--version-code or -V` this command will replace your version code. This version should be an integer and always greater than the last, but if you want just pass + symbol, the new version will be the last version + 1

`--version-name or -v` this command will replace your version name. this can be like this '2.1.1' or  '1.0.1-alpha'

`--automatized or -a` this command will replace version name and version code at the same time, version code will be the last version + 1, and version name will be the last version + 1

## Example how to install and use

```bash
npm i -g rn-version

rn-version -i

rn-version -V 2 -v 1.1.1
```

> This module only work with android yet. For Ios will be implemented, please wait.
