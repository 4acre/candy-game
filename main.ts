enum ActionKind {
    Walking,
    Idle,
    Jumping,
    rotate
}
namespace SpriteKind {
    export const Direction = SpriteKind.create()
    export const direction2 = SpriteKind.create()
    export const bombShowER = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    bomb.destroy(effects.spray, 500)
    if (bombCount > 0) {
        for (let value of sprites.allOfKind(SpriteKind.bombShowER)) {
            bombIndex = bombIndex + 1
            if (bombIndex == bombCount) {
                mySprite.destroy()
            }
        }
        bombCount = bombCount - 1
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (Math.abs(mySprite.x - value.x) < 50) {
                value.destroy(effects.disintegrate, 500)
            } else if (Math.abs(mySprite.y - value.y) < 50) {
                value.destroy(effects.disintegrate, 500)
            }
            bombIndex = 0
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    speed = 100
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    speed = 75
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    candy.destroy(effects.warmRadial, 100)
    if (bombOnScene == 1) {
        bombCount = bombCount + 1
        bomb = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . 6 6 6 5 5 6 6 6 . . . . 
            . . . 7 7 7 7 6 6 6 6 6 6 . . . 
            . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
            . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
            . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
            . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
            . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
            . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
            . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
            . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
            . . . 6 8 8 8 8 8 8 8 8 6 . . . 
            . . . . 6 6 8 8 8 8 6 6 . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.bombShowER)
        bombOnScene = 0
        score = 0
    }
    info.changeScoreBy(1)
    score = score + 1
    if (score == 5) {
        candy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . 6 6 6 5 5 6 6 6 . . . . 
            . . . 7 7 7 7 6 6 6 6 6 6 . . . 
            . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
            . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
            . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
            . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
            . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
            . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
            . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
            . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
            . . . 6 8 8 8 8 8 8 8 8 6 . . . 
            . . . . 6 6 8 8 8 8 6 6 . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        bombOnScene = 1
        score = 0
    } else {
        candy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . 4 4 4 5 5 4 4 4 . . . . 
            . . . 3 3 3 3 4 4 4 4 4 4 . . . 
            . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
            . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
            . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
            . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
            . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
            . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
            . . . 4 2 2 2 2 2 2 2 2 4 . . . 
            . . . . 4 4 2 2 2 2 4 4 . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        bombOnScene = 0
    }
    tiles.placeOnRandomTile(candy, sprites.castle.tileGrass2)
    ghost = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(ghost, assets.tile`tile1`)
    ghost.setVelocity(randint(-25, 25), randint(-25, 25))
    ghost.setFlag(SpriteFlag.BounceOnWall, true)
    ghost.lifespan = 20000
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false, effects.confetti)
})
let angle = 0
let ghost: Sprite = null
let score = 0
let bombOnScene = 0
let bombIndex = 0
let bombCount = 0
let bomb: Sprite = null
let candy: Sprite = null
let speed = 0
let mySprite: Sprite = null
scene.setBackgroundColor(7)
tiles.setTilemap(tilemap`level`)
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
speed = 75
candy = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 4 4 4 4 . . . . . . 
    . . . . 4 4 4 5 5 4 4 4 . . . . 
    . . . 3 3 3 3 4 4 4 4 4 4 . . . 
    . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
    . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
    . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
    . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
    . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
    . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
    . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
    . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
    . . . 4 2 2 2 2 2 2 2 2 4 . . . 
    . . . . 4 4 2 2 2 2 4 4 . . . . 
    . . . . . . 4 4 4 4 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Food)
tiles.placeOnRandomTile(candy, sprites.castle.tileGrass2)
let indicator2 = sprites.create(img`
    . . . . . . . 2 . . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . 2 2 2 2 2 . . . . . . 
    . . . . 2 2 2 2 2 2 2 . . . . . 
    . . . 2 2 2 2 2 2 2 2 2 . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    `, SpriteKind.direction2)
game.onUpdate(function () {
    controller.moveSprite(mySprite, speed, speed)
    console.logValue("x", mySprite.x % 2)
    if (mySprite.vx == 0 && mySprite.vy == 0) {
        mySprite.setImage(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
    } else if (mySprite.vx != 0) {
        if (mySprite.x % 2 < 1) {
            mySprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . f f f f f f . . . . . 
                . . . f f e e e e f 2 f . . . . 
                . . f f e e e e f 2 2 2 f . . . 
                . . f e e e f f e e e e f . . . 
                . . f f f f e e 2 2 2 2 e f . . 
                . . f e 2 2 2 f f f f e 2 f . . 
                . f f f f f f f e e e f f f . . 
                . f f e 4 4 e b f 4 4 e e f . . 
                . f e e 4 d 4 1 f d d e f . . . 
                . . f e e e e e d d d f . . . . 
                . . . . f 4 d d e 4 e f . . . . 
                . . . . f e d d e 2 2 f . . . . 
                . . . f f f e e f 5 5 f f . . . 
                . . . f f f f f f f f f f . . . 
                . . . . f f . . . f f f . . . . 
                `)
        } else {
            mySprite.setImage(img`
                . . . . . . f f f f f f . . . . 
                . . . . f f e e e e f 2 f . . . 
                . . . f f e e e e f 2 2 2 f . . 
                . . . f e e e f f e e e e f . . 
                . . . f f f f e e 2 2 2 2 e f . 
                . . . f e 2 2 2 f f f f e 2 f . 
                . . f f f f f f f e e e f f f . 
                . . f f e 4 4 e b f 4 4 e e f . 
                . . f e e 4 d 4 1 f d d e f . . 
                . . . f e e e 4 d d d d f . . . 
                . . . . f f e e 4 4 4 e f . . . 
                . . . . . 4 d d e 2 2 2 f . . . 
                . . . . . e d d e 2 2 2 f . . . 
                . . . . . f e e f 4 5 5 f . . . 
                . . . . . . f f f f f f . . . . 
                . . . . . . . f f f . . . . . . 
                `)
        }
    } else if (mySprite.vy > 0) {
        if (mySprite.y % 2 < 1) {
            mySprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . f f f f . . . . . . 
                . . . . f f f 2 2 f f f . . . . 
                . . . f f f 2 2 2 2 f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e 2 2 2 2 2 2 e e f . . 
                . f f e 2 f f f f f f 2 e f f . 
                . f f f f f e e e e f f f f f . 
                . . f e f b f 4 4 f b f e f . . 
                . . f e 4 1 f d d f 1 4 e f . . 
                . . . f e 4 d d d d 4 e f e . . 
                . . f e f 2 2 2 2 e d d 4 e . . 
                . . e 4 f 2 2 2 2 e d d e . . . 
                . . . . f 4 4 5 5 f e e . . . . 
                . . . . f f f f f f f . . . . . 
                . . . . f f f . . . . . . . . . 
                `)
        } else {
            mySprite.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f 2 2 f f f . . . . 
                . . . f f f 2 2 2 2 f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e 2 2 2 2 2 2 e e f . . 
                . . f e 2 f f f f f f 2 e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 4 4 f b f e f f . 
                . f e e 4 1 f d d f 1 4 e e f . 
                . . f e e d d d d d d e e f . . 
                . . . f e e 4 4 4 4 e e f . . . 
                . . e 4 f 2 2 2 2 2 2 f 4 e . . 
                . . 4 d f 2 2 2 2 2 2 f d 4 . . 
                . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        }
    } else if (mySprite.vy < 0) {
        if (mySprite.y % 2 < 1) {
            mySprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . f f f f . . . . . . 
                . . . . f f e e e e f f . . . . 
                . . . f e e e f f e e e f . . . 
                . . . f f f f 2 2 f f f f . . . 
                . . f f e 2 e 2 2 e 2 e f f . . 
                . . f e 2 f 2 f f f 2 f e f . . 
                . . f f f 2 f e e 2 2 f f f . . 
                . . f e 2 f f e e 2 f e e f . . 
                . f f e f f e e e f e e e f f . 
                . f f e e e e e e e e e e f f . 
                . . . f e e e e e e e e f . . . 
                . . . e f f f f f f f f 4 e . . 
                . . . 4 f 2 2 2 2 2 e d d 4 . . 
                . . . e f f f f f f e e 4 . . . 
                . . . . f f f . . . . . . . . . 
                `)
        } else {
            mySprite.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f e e e e f f . . . . 
                . . . f e e e f f e e e f . . . 
                . . f f f f f 2 2 f f f f f . . 
                . . f f e 2 e 2 2 e 2 e f f . . 
                . . f e 2 f 2 f f 2 f 2 e f . . 
                . . f f f 2 2 e e 2 2 f f f . . 
                . f f e f 2 f e e f 2 f e f f . 
                . f e e f f e e e e f e e e f . 
                . . f e e e e e e e e e e f . . 
                . . . f e e e e e e e e f . . . 
                . . e 4 f f f f f f f f 4 e . . 
                . . 4 d f 2 2 2 2 2 2 f d 4 . . 
                . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        }
    }
    if (mySprite.vx < 0) {
        mySprite.image.flipX()
    }
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.vx == 0 && value.vy == 0) {
            value.setImage(img`
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f11111111f.......
                ......fd11111111df......
                ......fd11111111df......
                ......fddd1111dddf......
                ......fbdbfddfbdbf......
                ......fcdcf11fcdcf......
                .......fb111111bf.......
                ......fffcdb1bdffff.....
                ....fc111cbfbfc111cf....
                ....f1b1b1ffff1b1b1f....
                ....fbfbffffffbfbfbf....
                .........ffffff.........
                ...........fff..........
                ........................
                ........................
                ........................
                ........................
                `)
        } else if (value.vx != 0) {
            if (value.x % 2 < 1) {
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    ......fbd1111111f.......
                    ......fdd1111111df......
                    ......fddd111111df......
                    ......fdddddd111df......
                    ......fdddddd111df......
                    ......fbddddddd1df......
                    ......ffbbddbfd1df......
                    .......fcbbdcfddbf......
                    .......fffbddccffff.....
                    .......ffffcfbbb1bcf....
                    ......ffffffffcd1b1f....
                    ...ffffffffff..fdfdf....
                    .....ffffff.....f.f.....
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    `)
            } else if (value.x % 3 < 1) {
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    ......fbd1111111f.......
                    ......fdd1111111df......
                    ......fddd111111df......
                    ......fdddddd111df......
                    ......fdddddd111df......
                    ......fbddddddd1df......
                    ......ffbbddbfd1df......
                    .......fcbbdcfddbf......
                    .......fffbddccffff.....
                    .......ffffcfbbb1bcf....
                    ......ffffffffcd1b1f....
                    ...ffffffffff..fdfdf....
                    .....ffffff.....f.f.....
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    `)
            } else {
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    ......fbd1111111f.......
                    ......fdd1111111df......
                    ......fddd111111df......
                    ......fdddddd111df......
                    ......fdddddd111df......
                    ......fbddddddd1df......
                    ......ffbbddbfd1df......
                    .......fcbbdcfddbf......
                    .......fffbddccffff.....
                    .......ffffcfbbb1bcf....
                    ......ffffffffcd1b1f....
                    ...ffffffffff..fdfdf....
                    .....ffffff.....f.f.....
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    `)
            }
        } else if (value.vy > 0) {
            if (value.y % 2 < 1) {
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    .......f11111111f.......
                    ......fd11111111df......
                    ......fd11111111df......
                    ......fddd1111dddf......
                    ......fbdbfddfbdbf......
                    ......fcdcf11fcdcf......
                    .....ffff111111bf.......
                    ....fc111cdb1bdfff......
                    ....f1b1bcbfbfc111cf....
                    ....fbfbfbffff1b1b1f....
                    .........fffffffbfbf....
                    ..........fffff.........
                    ...........fff..........
                    ........................
                    ........................
                    ........................
                    ........................
                    `)
            } else {
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    .......f11111111f.......
                    ......fd11111111df......
                    ......fd11111111df......
                    ......fddd1111dddf......
                    ......fbdbfddfbdbf......
                    ......fcdcf11fcdcf......
                    .......fb111111ffff.....
                    ......fffcdb1bc111cf....
                    ....fc111cbfbf1b1b1f....
                    ....f1b1b1ffffbfbfbf....
                    ....fbfbfffffff.........
                    .........fffff..........
                    ..........fff...........
                    ........................
                    ........................
                    ........................
                    ........................
                    `)
            }
        } else if (value.vy < 0) {
            if (value.y % 2 < 1) {
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    .....fffc1111111f.......
                    ...fc11fcd1111111f......
                    ...f1b1bfb1111dddf......
                    ...fbfbffc11111ddf......
                    ......fcf111111bbf......
                    .......fcbdb1b1fcf......
                    .......fffbfbfdff.......
                    ........ffffffff........
                    ........fffffffffff.....
                    .........fffffcf11cf....
                    .........fffffff1b1f....
                    ..........ffffffbfbf....
                    ...........ffff.........
                    ........................
                    ........................
                    ........................
                    `)
            } else {
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    .....fffc1111111f.......
                    ...fc11fcd1111111f......
                    ...f1b1bfb1111dddf......
                    ...fbfbffc11111ddf......
                    ......fcf111111bbf......
                    .......fcbdb1b1fcf......
                    .......fffbfbfdff.......
                    ........ffffffff........
                    ........fffffffffff.....
                    .........fffffcf11cf....
                    .........fffffff1b1f....
                    ..........ffffffbfbf....
                    ...........ffff.........
                    ........................
                    ........................
                    ........................
                    `)
            }
        }
        if (value.vx < 0) {
            value.image.flipX()
        }
    }
})
game.onUpdate(function () {
    bombIndex = 0
    for (let value of sprites.allOfKind(SpriteKind.bombShowER)) {
        bombIndex = bombIndex + 1
        value.setPosition(mySprite.x - 80 + 10 * bombIndex, mySprite.y - 50)
    }
})
// mySprite.setPosition(160, 120)
game.onUpdate(function () {
    console.logValue("Bomb Count", bombCount)
    if (Math.sqrt((mySprite.y - candy.y) * (mySprite.y - candy.y) + (mySprite.x - candy.x) * (mySprite.x - candy.x)) < 45) {
        indicator2.setFlag(SpriteFlag.Invisible, true)
    } else {
        indicator2.setFlag(SpriteFlag.Invisible, false)
    }
    angle = Math.atan2(mySprite.y - candy.y, mySprite.x - candy.x)
    indicator2.setPosition(mySprite.x - 45 * Math.cos(angle), mySprite.y - 45 * Math.sin(angle))
    console.log(360 * (Math.atan2(mySprite.y - candy.y, mySprite.x - candy.x) / 6.283185307179586))
    transformSprites.rotateSprite(indicator2, 360 * (angle / 6.283185307179586) - 90)
})
