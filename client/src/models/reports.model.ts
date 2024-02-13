export interface IReportItem {
  _id: string;
  creationDate: Date;
  ownerId: string;
  data: string;
  imageName?: string;
  ownerName: string;
}

export interface IReport extends IReportItem {
  updatesCount: number;
}

export interface IReportItemDTO {
  _id?: string;
  ownerId?: string;
  data?: string;
}

export interface IReportDTO extends IReportItemDTO {
  imageName?: any;
}

export interface IUpdateInReportDTO extends IReportItemDTO {
  reportId: string;
}
