export interface IReportItem {
  _id: string
  creationDate: Date
  ownerId: string
  data: string
}

export interface IReport extends IReportItem {
  updates: IReportItem[]
}

export interface IReportDTO {
  _id?: string
  ownerId?: string,
  data?: string
}