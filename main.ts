namespace SpriteKind {
    export const Powerups = SpriteKind.create()
    export const otherCars = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Powerups, function (sprite, otherSprite) {
    sprite.ax += sprite.ay + 50
    otherSprite.destroy()
    music.powerUp.play()
    pause(200)
    music.powerUp.stop()
    sprite.ax += -50
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.buttonPinkDepressed, function (sprite, location) {
    game.over(true)
})
function create_powerups () {
    powerups = sprites.create(img`
        . . . . . b b . . . . . . . . . 
        . . . . b 5 b b . . . . . . . . 
        . . b b 5 5 5 b b b . . . . . . 
        . b 5 5 5 5 5 5 5 b . . b . . . 
        . . b b 5 5 5 b b . . b 5 b . . 
        . . b 5 5 b 5 5 b . b 5 5 5 b . 
        . . b 5 b b b 5 b . . b 5 b . . 
        . . b b . . b b b . . b b b . . 
        . b 5 b b . . . . . b 5 b . . . 
        b 5 5 5 b b . . . b b 5 b b . . 
        . b 5 b b 5 b . b 5 5 5 5 5 b . 
        . b b b 5 5 5 b b b 5 5 5 b b . 
        . . b 5 5 5 5 5 b b 5 b 5 b . . 
        . . . b 5 5 5 b . . b b b . . . 
        . . . b 5 b 5 b . . . . . . . . 
        . . . b b b b b . . . . . . . . 
        `, SpriteKind.Powerups)
    powerups.setPosition(playerCar.x + 60, randint(60, 120))
    animation.runMovementAnimation(
    powerups,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
}
function introSplash () {
    game.splash("On your Mark....")
    pause(1000)
    game.splash("Get ready....")
    pause(1000)
    game.splash("GOO!!!")
    effects.confetti.startScreenEffect()
    pause(500)
    effects.confetti.endScreenEffect()
}
function create_rocks () {
    rock = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . c c c c . . 
        . c c c c c . c c c c c f c c . 
        c c a c c c c c 8 f f c f f c c 
        c a f a a c c a f f c a a f f c 
        c a 8 f a a c a c c c a a a a c 
        c b c f a a a a a c c c c c c c 
        c b b a a c f 8 a c c c 8 c c c 
        . c b b a b c f a a a 8 8 c c . 
        . . . . a a b b b a a 8 a c . . 
        . . . . c b c a a c c b . . . . 
        . . . . b b c c a b b a . . . . 
        . . . . b b a b a 6 a . . . . . 
        . . . . c b b b 6 6 c . . . . . 
        . . . . . c a 6 6 b c . . . . . 
        . . . . . . . c c c . . . . . . 
        `, SpriteKind.Enemy)
    rock.setPosition(randint(0, 160), randint(60, 120))
}
function create_otherCars () {
    for (let index = 0; index < 5; index++) {
        otherCar = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 4 2 2 2 2 2 2 c 2 . . . 
            . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
            . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
            . 2 c 2 e e e e e e e b c 4 2 2 
            . 2 2 e b b e b b b e e b 4 2 2 
            . 2 e b b b e b b b b e 2 2 2 2 
            . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
            . e e e e e e f e e e f e 2 d d 
            . e e e e e e f e e f e e e 2 d 
            . e e e e e e f f f e e e e e e 
            . e f f f f e e e e f f f e e e 
            . . f f f f f e e f f f f f e . 
            . . . f f f . . . . f f f f . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.otherCars)
        otherCar.setPosition(randint(0, 10), randint(60, 120))
        otherCar.setVelocity(randint(70, 100), 0)
    }
}
function create_player () {
    playerCar = sprites.create(img`
        . . . . 8 8 8 8 8 . . . . . . . 
        . . . 8 6 6 6 6 6 8 8 . . . . . 
        . . 8 6 6 6 6 6 6 6 8 8 . . . . 
        . 8 b 7 6 6 6 6 6 7 9 8 . . . . 
        8 b 9 7 6 6 6 6 6 7 9 9 8 8 . . 
        8 9 9 7 6 6 6 6 7 7 9 9 6 6 8 . 
        8 9 9 6 7 7 7 7 7 6 9 9 6 6 6 8 
        8 9 9 8 8 8 8 8 8 8 9 9 6 6 6 8 
        8 9 b 8 b 8 b b b 8 b 9 6 6 6 8 
        8 b 8 b b 8 b b b b 8 8 8 8 6 8 
        8 8 8 6 6 8 6 6 6 6 8 8 3 3 8 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 3 3 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 8 f f f 8 8 8 8 f f f 8 8 8 8 
        . f c b b f 8 8 f c b b f 8 8 . 
        . . f f c . . . . f f c . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(playerCar, 100, 100)
    playerCar.ax = 0
}
function create_map () {
    scene.setBackgroundColor(9)
    scene.cameraFollowSprite(playerCar)
    tiles.setTilemap(tilemap`level6`)
    tiles.placeOnRandomTile(playerCar, sprites.dungeon.buttonTealDepressed)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.otherCars, function (sprite, otherSprite) {
    if (game.runtime() > 2000) {
        info.changeLifeBy(-1)
        music.bigCrash.play()
        otherSprite.setFlag(SpriteFlag.Ghost, true)
        pause(500)
        otherSprite.say("OWW! Don't hit me!", 500)
        music.bigCrash.stop()
        otherSprite.setFlag(SpriteFlag.Ghost, false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
    sprite.vx += sprite.vx * -3
    sprite.vy += sprite.vy * -3
    sprite.x += -5
    music.smallCrash.play()
    sprite.startEffect(effects.ashes)
    pause(1000)
    music.smallCrash.stop()
    effects.clearParticles(sprite)
})
let otherCar: Sprite = null
let rock: Sprite = null
let playerCar: Sprite = null
let powerups: Sprite = null
create_player()
create_map()
create_otherCars()
info.startCountdown(30)
info.setLife(3)
game.onUpdateInterval(5000, function () {
    create_powerups()
})
game.onUpdateInterval(2000, function () {
    create_rocks()
})
