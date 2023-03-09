type NodeTypes = "number" | "string";

export interface INode {
	type: NodeTypes;
}

export interface ISceneNode extends INode {
	id: string;
	x?: number;
	y?: number;
	in?: string;
	out?: string;
}
