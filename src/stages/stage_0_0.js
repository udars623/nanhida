import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "Stage 0-0 初戦";

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Nrm, T.Mnt, T.Mnt, T.Mnt, T.Mnt, T.Nrm],
    [T.Mnt, T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Wtr],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Wtr, T.Wtr],
    [T.Nrm, T.Nrm, T.Nrm, T.Wtr, T.Wtr, T.Wtr],
    [T.Nrm, T.Nrm, T.Wtr, T.Wtr, T.Wtr, T.Nrm]
];

let unitList = [
    {
        gridPos: { x: 2, y: 6 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pRizaruto,
		params: {
			zokusei: consts.zokusei.none
		}
    },

    {
        gridPos: { x: 5, y: 3 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red
		}
    }
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

