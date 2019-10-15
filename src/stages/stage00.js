import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Nrm, T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Wtr],
    [T.Nrm, T.Nrm, T.Nrm, T.Wtr, T.Nrm, T.Mnt],
    [T.Nrm, T.Wtr, T.Nrm, T.Wtr, T.Nrm, T.Mnt],
    [T.Nrm, T.Wtr, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Mnt, T.Nrm]
];

let unitList = [
    {
        gridPos: { x: 3, y: 7 },
        appearTurn: 0,
        isEnemy: false,
        image: "img_kenshi"
    },

    {
        gridPos: { x: 4, y: 2 },
        appearTurn: 0,
        isEnemy: true,
        image: "img_kenshi2"
    }
];

export default function createStage()	{
	return new Stage(maxGrid, terrainMap, unitList);
}
