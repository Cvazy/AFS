import { CompanyStore } from "entities/Company";
import { ContactStore } from "entities/Contact";

export class RootStore {
  companyStore: CompanyStore;
  contactStore: ContactStore;

  constructor() {
    this.companyStore = new CompanyStore();
    this.contactStore = new ContactStore();
  }
}

export const rootStore = new RootStore();
