# overview

I initialized a Webpack project, and used HtmlWebpackPlugin to automatically generate template html files, webpack-dev-server to implement hot updates, and added loaders such as bable and sass to implement a basic react project.

1. The react APP component obtains data through the web worker and stores it in IndexDB.
2. The business component obtains data directly through IndexDB
3. Use Baidu Maps for location visualization
4. Use react-window to only render part of a large data set for the "The food closest to me" list

Skill keys: webpack,sass,node server,express,fetch,BaiduMap,web worker,IndexDB,Virtual Scrolling (react-window)

# Quick Start

## Installation

npm install

## run project

### First run server

Open a terminal window, run: yarn server

### Second run client

Open another terminal window, run: yarn start

# notes

My plan is to configure a docker, put the arango and redis images in it, initialize the csv data and store it in arango, and use redis to cache the api data. Unfortunately, my windows computer cannot install docker due to version issues.
