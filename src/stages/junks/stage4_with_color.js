import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Nrm],
    [T.Nrm, T.Wtr, T.Nrm, T.Nrm, T.Mnt, T.Nrm],
    [T.Nrm, T.Wtr, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Wtr, T.Nrm, T.Nrm, T.Mnt, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Mnt, T.Nrm],
    [T.Wtr, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm]
];

let unitList = [
    {
        gridPos: { x: 2, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pTomato,
		params: {
			zokusei: consts.zokusei.red
		}
    },
    {
        gridPos: { x: 3, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pKenshiJinlai,
		params: {
			zokusei: consts.zokusei.none
		}
    },
    {
        gridPos: { x: 4, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pBlueberry,
		params: {
			zokusei: consts.zokusei.blue
		}
    },
    {
        gridPos: { x: 5, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pCabbage,
		params: {
			zokusei: consts.zokusei.green
		}
    },

    {
        gridPos: { x: 1, y: 1 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eCavBow,
		params: {
			zokusei: consts.zokusei.red
		}
    },
    {
        gridPos: { x: 1, y: 3 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.blue
		}
    },
    {
        gridPos: { x: 3, y: 1 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eCavLance,
		params: {
			zokusei: consts.zokusei.green
		}
    },
	{
        gridPos: { x: 5, y: 1 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.red
		}
    },
    {
        gridPos: { x: 3, y: 2 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue
		}
    },
    {
        gridPos: { x: 1, y: 5 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green
		}
    },
    {
        gridPos: { x: 3, y: 4 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue
		}
    },
    {
        gridPos: { x: 6, y: 5 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red
		}
    },
	{
        gridPos: { x: 6, y: 4 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.green
		}
    }
];

export default function createStage()	{
	return new Stage(maxGrid, terrainMap, unitList);
}
