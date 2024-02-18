import {IReportDTO} from "./reportsDto.model";

export interface IUpdateInReportDTO extends IReportDTO {
  reportId: string;
}
