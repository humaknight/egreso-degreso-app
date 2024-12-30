export class IngresoEgreso {
  descripcion: string;
  monto: number;
  tipo: string;
  uid?: string;

  /*
  constructor(data: any) {
    this.descripcion = data.descripcion;
    this.monto = data.monto;
    this.tipo = data.tipo;
    this.uid = data.uid;
  }
*/
  constructor(descripcion: string, monto: number, tipo: string, uid?: string) {
    this.descripcion = descripcion;
    this.monto = monto;
    this.tipo = tipo;
   // this.uid = uid;
  }
}