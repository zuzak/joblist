## Installation

To use this application, you should clone this repository on a device
upon which a relatively recent version of node.js is installed.

One can then issue the following commands to install the program's
dependencies:
```
npm install
```

## Tests

[![Build Status](https://travis-ci.org/zuzak/joblist.svg?branch=master)](https://travis-ci.org/zuzak/joblist)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c1a296603fdf4ebab4b717f58ac7ee53)](https://www.codacy.com/app/douglas/joblist?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=zuzak/joblist&amp;utm_campaign=Badge_Grade)

Rudimentary tests are included. They run using [mocha](https://mochajs.org/)
as the framework, and use supertest for simple HTTP request based tests.

The code in this repository is automatically tested against node.js v4.4.7,
which is the version upon which the codebase was developed, as well as
the most recent version of node.js, which at time of writing was v6.4.0.

To run the tests, yourself, simply issue:
```
npm test
```


## Running

To run the code, issue `npm start` before pointing your browser at port 3000.
