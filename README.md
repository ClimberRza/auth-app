To make db.json work in the project, you need to type 'json-server db.json --port 3500 --watch' in the terminal.
To run all tests, type 'npm run test:watch' in the terminal.
Tests are provided only for util-functions (utils).
To test other functionality, I used: debugger, breakpoints, callstack, watch (callstack, watch and breakpoints in devTools).
P.S. There is one test suit, that fails because of TS unsupportability in Jest. I know, that it can be well configured (Jest will support TS), but when I tried to solve that problem, an error occured in the terminal. Unfortunately, I did'nt solve it :(
