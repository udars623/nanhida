import consts from "/src/consts";
let T = consts.terrainTypes;

export default class Stage {
    constructor(maxGrid, terrainMap, unitList, nameStr) {
        this.maxGrid = maxGrid;
        this.terrainMap = terrainMap; // NOTE: use it as [y-1][x-1] !! or getTerrain(x,y)
        this.unitList = unitList;
		this.nameStr = nameStr;

        this.imageCache = [];
        this.hGame = null; 	// should not be initialised in constructor 
							// because it's called by stage scripts rather than game
    }

    initStage(hGame) {
        this.hGame = hGame;
        // push stuffs into game by calling events
        this.unitList.forEach(unit => {
            if (unit.appearTurn === 0)
                hGame.eventPlaceUnit(
					unit.gridPos, unit.isEnemy, unit.typeID, unit.params
				);
        });

        this.imageCache[T.Nrm] = document.getElementById("img_terrain_grass");
        this.imageCache[T.Mnt] = document.getElementById("img_terrain_yama");
        this.imageCache[T.Wtr] = document.getElementById("img_terrain_kawa");
    }
	
	endTurn(hGame) {
        this.unitList.forEach(unit => {
            if (
                unit.appearTurn === hGame.turn &&
                unit.isEnemy === (hGame.currentPhase === hGame.PHASE_ENEMY)
            )
                hGame.eventPlaceUnit(
					unit.gridPos, unit.isEnemy, unit.typeID, unit.params
				);
        });
    }

    getTerrain(x, y) {
        return this.terrainMap[y - 1][x - 1];
    }

    update(df) {}

    draw(ctx) {
        for (let i = 1; i <= this.maxGrid.x; i++) {
            for (let j = 1; j <= this.maxGrid.y; j++) {
                let pos = this.hGame.gridPosToPos({ x: i, y: j });
                //alert(i + "," + j + ", " + [this.terrainMap[j][i]]);
                ctx.drawImage(
                    this.imageCache[this.getTerrain(i, j)],
                    pos.x - this.hGame.gridSize / 2,
                    pos.y - this.hGame.gridSize / 2,
                    this.hGame.gridSize,
                    this.hGame.gridSize
                );
            }
        }
    }
}
