import { Centre } from "./centre";
import { Magasin } from "./magasin";

import { Lot } from "./lot";


export class Operation{

    idOperation!: number;
    poidsLait!: number;
    dateOperation!: string;
    typeOp!: string;
    code!:number;
    mgasin!:Magasin;
    // lot!:Lot;
    centreCollecte!:Centre;
    
  }