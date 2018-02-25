WowFood - Raid Consumables Price Calculator
=

This web application tracks the WoW (World of Warcraft) auction house for a selected server.
Using the data from there it will show you the cheapest way to make something

**How to run the application**
_Note: this was devoloped using Node.js 9.4.0 but should run on node.js 7.6.0 or higher_
Install node.js (9.4.0)
Install docker

Using terminal/command prompt/whatever navigate to where this folder was installed

_docker-compose up_

navigate back here in another terminal window

_npm install_

_NODE_ENV=staging node bin/www_

In your web browser navigate to http://localhost:3000/

The first time it is run you may want to uncomment this line in app.js to make the application download the data on start up

_blizzardApi.getAHData();_