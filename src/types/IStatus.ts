export enum StatusName {
  new = "Поступил",
  accepted = "Подтвержден",
  issued = "Выдан",
  cancelled = "Отменен",
}

export default interface IStatus {
  name: StatusName,
  _id: string,
}
