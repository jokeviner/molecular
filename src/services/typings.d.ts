declare namespace M {
  type Position = 'end' | 'core' | 'side';
  type FG = {
    id: number;
    image_url: string;
    name: string;
    lumo: number;
    homo: number;
    side:number;
    position: Position;
  };
  type Molecular = {
    start?: FG;
    end?: FG;
    side?: FG;
    core: FG[];
  };
  type addFG = (item: FG) => void;
}
