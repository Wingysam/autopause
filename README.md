# autopause
`autopause` is a utility to automatically mine cryptocurrency with NiceHash while not gaming.

## Install
* Download this project with `git clone` or [download the zip](https://github.com/Wingysam/autopause/archive/refs/heads/master.zip).
* If you haven't already, [install node](https://nodejs.org/en/download/).
* [Open a PowerShell window](https://i.imgur.com/66uDk6i.png) with shift + right click, and run `npm install`.
* Copy `config.example.js` to `config.js` and fill in the details.

## Run
The project has to be run as administrator. There are two options:
1. Open an administrator powershell and run `node index.js`
2. Run the Start.exe that prompts for administrator then launches `node index.js`.

## Troubleshooting
Make sure you've configured it correctly. Most of the details need to be filled in by using your browser's network inspector to see the details used by the NiceHash dashboard.

If that didn't fix it, open an issue and I'll see if I can help!

## Contributing
Please create pull requests with game exe names in `processes.cfg`. Sort the exe names alphabetically to avoid merge conflicts.

# About Developer
Hi, I'm Wingy. This is a project I made because I couldn't find anything like it. My website is [wingysam.xyz](https://wingysam.xyz). Please [hire me](https://wingysam.xyz/hire).

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C1C2347HB)