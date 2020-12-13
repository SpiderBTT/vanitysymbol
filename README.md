# Symbol Vanity Address Generator

This is an *experimental* tool for generating Vanity addresses for the [Symbol blockchain](https://symbolplatform.com).
You provide it with a string of characters that should be present in the address, and the script will look for such an address and return its secret key..

Don't trust this tool blindly. When you have the address and private key, import the secret key in the symbol wallet, and make a backup form the wallet.


# About Symbol addresses

Symbol addresses are 39 characters long with some structure:
- the first character indicates the network type (production, testnet, ...) and
  this generator only supports the production network, for which addresses start with N
- the second character is A, B, C, or D.
- the last characters are a checksum, and the last character is either A, I, Q or Y

Excepting this, we can generate private keys randomly and check if the corresponding address
matches a pattern we want.

# Using this script

This script is provided as a Docker container image, making docker a requirement.

The script uses regexps to match, here is a quick guide on how you specify the patterns you are
looking for. We will want to match address having the 3 characters `XYM`:
- match at the start (after the two first character): just give the characters, i.e. `XYM`
- match anywhere in the address: search for `.*XYM`
- match at the end (remember the last character cannot be M): `.*XYM.$`

You can call this script without argument, and you will then be prompted for the search pattern.
Alternatively, you can pass your search string as argument to the string, enclosed in single quotes,
like this: `.*XYM`.

# Strength of private keys

An important characteristic of a private is is that it shouldn't be guessable
by a third party, as that would compromise the account.
So the best way to generate a private key is to generate it randomly, but
randomness is not an easy feat to achieve. That's why this script uses
[openssl](https://www.openssl.org/) to [generate random values](https://www.openssl.org/docs/man1.1.1/man1/rand.html).
