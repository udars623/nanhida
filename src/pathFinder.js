const dx = [0, -1, +1, 0];
const dy = [+1, 0, 0, -1];
let dAtk = [];
dAtk[0] = [];
dAtk[1] = [{x:0, y:+1}, {x:-1, y:0}, {x:+1, y:0}, {x:0, y:-1} ];
dAtk[2] = [{x:0, y:+2}, {x:-1, y:+1}, {x:+1, y:+1}, {x:-2, y:0},
			{x:+2, y:0}, {x:-1, y:-1}, {x:+1, y:-1}, {x:0, y:-2}];
const MAX_DIST = 100000;

export default class PathFinder {
    constructor(hGame) {
        this.hGame = hGame;
        this.maxGrid = hGame.maxGrid;
        this.eList = hGame.enemyUnitList;
        this.pList = hGame.playerUnitList;
        this.hStage = hGame.stage;

        this.visited = null;
        this.path = null;
    }

    /* 
        Main service of PathFinder.
        return an object pathData := {
			prev[x][y] := (gp) gp of parent node in the path tree.
			dist[x][y] := (int) dist from startGP.
			listPossibleDest := [] of reachable gp. NOTE: MIGHT HAVE OTHER UNITS
			attackable[x][y] := (int) whether that gp can be attacked by the unit.
								-1 means not attackable.
								the value is also the index of x,y @ listAttackable
			listAttackable := [{gp, gpsFrom}]. ~.gpsFrom is [] of gps where you can
								attack ~.gp. NOTE: THEY MIGHT BE BLOCKED BY OTHER UNITS
		}
    */
    floodFill(
		unit, startGP, 
		searchRange, 
		flagIgnoreEnemyUnit = false
	) {
        let prev = [];
        let dist = [];
		let attackable = [];
        for (let i = 1; i <= this.maxGrid.x; i++) {
            prev[i] = [];
            dist[i] = [];
            attackable[i] = [];
            for (let j = 1; j <= this.maxGrid.y; j++) {
                dist[i][j] = MAX_DIST;
                prev[i][j] = null;
                attackable[i][j] = -1;
            }
        }

        let queue = [];
        let head = 1,
            tail = 0;
        queue[head] = startGP;
        prev[startGP.x][startGP.y] = startGP;
        dist[startGP.x][startGP.y] = 0;
        let listPossibleDest = [];
        listPossibleDest.push(startGP);
		let listAttackable = [];
		
		let dAttacks = dAtk[unit.attackRange];
		this.addAttackable(dAttacks, attackable, listAttackable, startGP);

        while (head > tail) {
            tail++;
            if (dist[queue[tail].x][queue[tail].y] >= searchRange) continue;
            for (let i = 0; i < 4; i++) {
                let xNew = queue[tail].x + dx[i];
                let yNew = queue[tail].y + dy[i];
                if (
                    xNew >= 1 &&
                    xNew <= this.maxGrid.x &&
                    yNew >= 1 &&
                    yNew <= this.maxGrid.y &&
                    dist[xNew][yNew] === MAX_DIST
                ) {
                    let gpNew = { x: xNew, y: yNew };
                    if (unit.checkPassable(gpNew, flagIgnoreEnemyUnit)) {
                        head++;
                        queue[head] = gpNew;
                        dist[xNew][yNew] = dist[queue[tail].x][queue[tail].y] + 1;
                        prev[xNew][yNew] = queue[tail];
						
						this.addAttackable(dAttacks, attackable, listAttackable, gpNew);
						
                        listPossibleDest.push(gpNew);
                    }
                    //alert(xNew + "," + yNew + "," + dist[xNew][yNew]);
                }
            }
        }
        let pathData = { 
			prev: prev, 
			dist: dist, 
			listPossibleDest: listPossibleDest,
			attackable: attackable,
			listAttackable: listAttackable
		};
		return pathData;
    }

    /*
        Minor service. Tells from pathData whether goalGP is reachable.
    */
    isReachable(pathData, goalGP) {
        return pathData.dist[goalGP.x][goalGP.y] !== MAX_DIST;
    }

    /*
        Main service. Extract the path starting from startGP to goalGP
        from pathData. 
        path[0] should always be startGP if done correctly.
        goalGP is NOT included in the path.
    */
    retrievePath(pathData, startGP, goalGP) {
        let prev = pathData.prev;
        if (prev[goalGP.x][goalGP.y] !== null) {
            let x = goalGP.x,
                y = goalGP.y;
            let dist = 0;
            //alert(x + "," + y);
            while (x !== startGP.x || y !== startGP.y) {
                dist++;
                let xNew = prev[x][y].x;
                y = prev[x][y].y;
                x = xNew;
                //alert(x + "," + y);
            }
            let path = [];
            x = goalGP.x;
            y = goalGP.y;
            for (let i = 0; i < dist; i++) {
                path[dist - i - 1] = prev[x][y];
                let xNew = prev[x][y].x;
                y = prev[x][y].y;
                x = xNew;
            }
            return path;
        }
        return null;
    }

	// unused
    findPath(unit, startGP, goalGP) {
        let pathData = this.floodFill(unit, startGP, unit.moveDist);
        //alert(startGP.x + "," + startGP.y + "," + goalGP.x + "," + goalGP.y);
        return this.retrievePath(pathData, startGP, goalGP);
    }
	
	// private methods
	checkIfGpInMaxGrid(x, y) {
		if (x < 1 || y < 1 || x > this.maxGrid.x || y > this.maxGrid.y) return false;
		return true;
	}
	
	addAttackable(dAttacks, attackable, listAttackable, gp)
	{
		dAttacks.forEach(dgp => {
			//alert(dgp.x +","+ dgp.y +","+ gp.x +","+  gp.y)
			if (this.checkIfGpInMaxGrid(gp.x + dgp.x, gp.y + dgp.y)) {
				if (attackable[gp.x + dgp.x][gp.y + dgp.y] === -1) {
					attackable[gp.x + dgp.x][gp.y + dgp.y] = listAttackable.length;
					listAttackable.push({
						gp: {x : gp.x + dgp.x, y : gp.y + dgp.y},
						gpsFrom: [gp]
					});
				} else {
					listAttackable[attackable[gp.x + dgp.x][gp.y + dgp.y]].gpsFrom.push(gp);
				}
			}
		});
	}
}
