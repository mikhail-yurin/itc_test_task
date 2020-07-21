import ISize from './ISize'
import IStatus from './IStatus'

interface IOrder {
  _id?: string,
  fullname: string,
  ordertime?: number,
  deliverytime?: number,
  workspace: string,
  size: ISize,
  status: IStatus,
}

export default IOrder;