export interface IPhoto {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}

export interface ICompany {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: {
    no: string;
    issue_date: string;
  };
  type: string[];
  status: string;
  photos: IPhoto[];
  createdAt: string;
  updatedAt: string;
}
