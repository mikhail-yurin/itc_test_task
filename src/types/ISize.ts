export enum SizeName {
  XS,
  S,
  M,
  L,
  XL,
  XXL,
  XXXL,
}

export default interface ISize {
  name: SizeName,
  _id: string,
}

export interface ISizeAmount {
  _id: string,
  name: SizeName,
  reserved: number,
  total: number,
}
