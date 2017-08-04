# Trying out Material Design 
It's on the Version 2 (please check it out if you want :) )


# DNA Sequencing
Project forked from Angular Seed

### Install Dependencies

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`angular-seed` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].

### To start the NodeJS Server

Go cd in server and

```
node server.js
```
### Project Files
* `app/dna-sequencing`
* `server/server.js`


### Next Steps
* More commenting/Testing
* Saving Search and the result set
* Add database (mongo)
* Add logging ability
