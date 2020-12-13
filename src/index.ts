import {
    Account,
    Address,
    NetworkType,
} from 'symbol-sdk';

const { exec } = require("child_process");
var ask = require('prompt-sync')();

function search(regex: RegExp, alreadyTried: number) {
    exec("openssl rand -hex 1032", (error, stdout, stderr) => {
        var found=false;
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        var startIndex=0;
        var random= stdout.trim();
        while (random.length - startIndex >= 64) {
            var key = random.substr(startIndex, 64)
            var account=Account.createFromPrivateKey(key, NetworkType.TEST_NET);
            var plain = account.address.plain();
            if (regex.test(plain)) {
                console.log("MATCH FOUND!")
                console.log(plain)
                console.log(key)
                console.log("--")
                // do not generate multiple addresses from overlapping keys, so return here
                return
            }
            alreadyTried++;
            startIndex++;
        }
        if (! found) {
            console.log("Tried "+alreadyTried+" addresses");
            search(regex, alreadyTried);
        }
    })
}
var explanations = `
This is a vanity address generator for Symbol (https://symbolplatform.com/).
Symbol addresses are 39 characters long with some structure:
- the first character indicates the network type (production, testnet, ...) and
  this generator only supports the production network, for which addresses start with N
- the second character is A, B, C, or D.
- the last characters are a checksum, and the last character is either A, I, Q or Y

Excepting this, we can generate private keys randomly and check if the corresponding address
matches a pattern we want.
The script uses regexps to match, here is a quick guide on how you specify the patterns you are
looking for. We will want to match address having the 3 characters XYM:
- match at the start (after the two first character): just give the characters, eg XYM
- match anywhere in the address: search for .*XYM
- match at the end (remember the last character cannot be M): .*XYM.$

You can call this script without argument, and you will then be prompted for the search pattern.
Alternatively, you can pass your search string as argument to the string, enclosed in single quotes,
like this: '.*XYM'.
`

var searchString
var args = process.argv.slice(2)
if (args.length==1) {
    searchString=args[0]
}
else {
    console.log(explanations)
    searchString = ask("enter start string you are looking for: ");
}
var upCaseMatch = searchString.toUpperCase();
var regex = new RegExp("^.."+upCaseMatch);
search(regex,0)
