import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Mnt, T.Nrm, T.Nrm, T.Mnt, T.Mnt, T.Mnt],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Mnt],
    [T.Wtr, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt],
    [T.Wtr, T.Wtr, T.Wtr, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Wtr, T.Nrm, T.Wtr, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Wtr, T.Wtr],
    [T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Nrm]
];

let unitList = [
    {
        gridPos: { x: 4, y: 4 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pKenshi,
		params: {}
    },
    {
        gridPos: { x: 2, y: 2 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pKenshi,
		params: {}
    },
    {
        gridPos: { x: 3, y: 1 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pKenshi,
		params: {}
    },
    {
        gridPos: { x: 4, y: 2 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pKenshi,
		params: {}
    },

    {
        gridPos: { x: 3, y: 2 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eArcher,
		params: {}
    }
];

export default function createStage()	{
	return new Stage(maxGrid, terrainMap, unitList);
}
