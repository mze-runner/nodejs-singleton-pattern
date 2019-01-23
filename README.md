# Manage multiply mongodb connection via global var space in **NodeJS**

## Background

As using application vars in global space is tend to be an **anti-pattern**. You can find pretty much articles over the matter on the Internet. For instance, [Global Variables Are Bad](http://wiki.c2.com/?GlobalVariablesAreBad). Answers on Stackoverflow are mostly tells the same, here you go an example  
[Why are global variables considered bad practice? (node.js)](https://stackoverflow.com/questions/18635136/why-are-global-variables-considered-bad-practice-node-js) and so on and so forth. 

Thankfully, I came across [Singleton Pattern](http://wiki.c2.com/?SingletonPattern) and another article with step by step walkthrough on implementation a singleton for node js. 

 [Creating A True Singleton In Node.js, With ES6 Symbols](https://derickbailey.com/2016/03/09/creating-a-true-singleton-in-node-js-with-es6-symbols/)

Leveraging ```Symbol``` helps to avoid pollution problem, implicit coupling, etc and build an API to work with application’s global variables in pretty straight forward fashion. So my verion of singlenton to solve specific purpose I made after the reading.

PS. I pay great credits to the author of the article which brought myself to the solution. You saved my day, mate.

## Multiply mongodb connection

Apart of showing singleton pattern in actions I also pick up, per my mind, pretty frequently asking question. **How to make several connections to different mongodb databases using mongoose**. 
I am offering fully working end-to-end solution I elaborated for myself. I wrap it up into tiny express server for a showcase.

### Feedback

Hope the example may be useful, let me know your thoughts over the idea.
