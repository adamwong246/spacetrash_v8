# Demiurge

## A Typescript game engine

Demiurge is my personal game engine which underpins my personal game, "space trash". It is akin to Phaser but with a few differences.

1) Demiurge is built as an Entity-Component-System (ECS) first. The ECS is fast and simple, and it does not constrain you to store only data in it's components. Every component is a instantiation of a class, meaning it carries with it both data and methods. 

2) Demiurge uses pixi for 2d graphics as Phaser does, but demiurge integrates threejs as well. Both are abstracted behind similar APIs.

3) Demiurge has it's own 2D physics system, called "Samurai", It is so named after it's inspiration- the forgotten "ninja" physics system. Currently Phaser has 2 physics systems- arcade and matterjs. Arcade is very fast, but limited to circles and axis-aligned rectangles. Matter is much more sophisticated but requires an order of magnitude more resources. Samurai aims to cover the middle ground between the 2. Samurai does not implement all of matterjs- for instance, features like ropes, pulleys, cloth simulations and soft-body simulations are entirely outside the purview of Samurai. Samurai is nearly as fast as arcade, but allows for more sophisticated 2d geometry-  boxes, circles, ellipses, lines, points and polygons. In fact, Demiurge represents ALL elements, even grid tiles, as vector shapes, rather than rasters. This is all thanks to a wonderful library called `detect-collions` https://github.com/Prozi/detect-collisions 

4) Whereas Phaser and other game toolkits usually provide an IDE development environment, Demiurge builds it's development environment directly into the game. Because it support multiple canvases, Demiurge allows you to easily build out sdebug views of you game.

5) Demiurge has very fast rebuild times, thanks to esbuild. 

6) Demiurge depends upon the Tiled editor. 

7) Demiurge is designed around a code pattern which I call the "tower crane pattern". It is a series of "stacked" abstract classes, with the ECS at the bottom, and your game at the top as an implementation. Each intermediate abstract classes is responsible for one concern- for instance, handling controls or loading assets. There is, as of the time of this writing, 4 layers within the demiurge engine. My game implements 8 more layers on top of that, with more likely to be added. 

## Is demiurge for you?

Probably not, at least not yet. Demiurge is under rapid development, but it should appeal to web developers who would like to make a game. If you don't like typescript, demiurge is definitely not for you.

## future features

- a 3d physics engine to complement samurai. I'm not a math guy so this might take a long time before I can take on this feature.

## TODO

Bring the pixi and threejs asset loaders into congruency. Load the pixi assets as base64. investigate threejs asset cache