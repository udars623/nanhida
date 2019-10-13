const dx = [0, -1, +1, 0];
const dy = [+1, 0, 0, -1];
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
        return a pathData = {prev, dist, listPossibleDest}.
        prev[x][y] := gp of parent node in the path tree.
        dist[x][y] := dist from startGP.
        listPossibleDest := [] of reachable positions.
    */
    floodFill(unit, startGP, searchRange, flagIgnoreUnit = false) {
        let prev = [this.maxGrid.x + 1];
        let dist = [this.maxGrid.x + 1];
        for (let i = 1; i <= this.maxGrid.x; i++) {
            prev[i] = [this.maxGrid.y + 1];
            dist[i] = [this.maxGrid.y + 1];
            for (let j = 1; j <= this.maxGrid.y; j++) {
                dist[i][j] = MAX_DIST;
                prev[i][j] = null;
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
                    if (unit.checkPassable(gpNew, flagIgnoreUnit)) {
                        head++;
                        queue[head] = gpNew;
                        dist[xNew][yNew] =
                            dist[queue[tail].x][queue[tail].y] + 1;
                        prev[xNew][yNew] = queue[tail];
                        listPossibleDest.push(gpNew);
                    }
                    //alert(xNew + "," + yNew + "," + dist[xNew][yNew]);
                }
            }
        }
        return { prev: prev, dist: dist, listPossibleDest: listPossibleDest };
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
            let path = [dist];
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

    findPath(unit, startGP, goalGP) {
        let pathData = this.floodFill(unit, startGP, unit.moveDist);
        //alert(startGP.x + "," + startGP.y + "," + goalGP.x + "," + goalGP.y);
        return this.retrievePath(pathData, startGP, goalGP);
    }
}
