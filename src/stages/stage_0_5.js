import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "Stage 0-5 分断の術II";

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt],
    [T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt],
    [T.Mnt, T.Nrm, T.Wtr, T.Wtr, T.Nrm, T.Mnt],
    [T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Mnt, T.Mnt, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm]
];

let unitList = [
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
        gridPos: { x: 2, y: 1 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.red
		}
    },
	{
        gridPos: { x: 3, y: 1 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.blue
		}
    },
	
	{
        gridPos: { x: 4, y: 1 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.green
		}
    },
	{
        gridPos: { x: 5, y: 1 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.red
		}
    },
	
	
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

