import { makeAutoObservable, runInAction } from "mobx";
import { apiClient } from "app/api";
import { IContact } from "../types";

export class ContactStore {
  contact: IContact | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchContacts(id: string) {
    if (this.contact) {
      return this.contact;
    }

    this.isLoading = true;

    try {
      const response = await apiClient.get(`/contacts/${id}`);
      runInAction(() => {
        this.contact = response.data;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Unknown error occurred";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async updateContact(id: string, data: Partial<IContact>) {
    this.isLoading = true;
    try {
      const response = await apiClient.patch(`/contacts/${id}`, data);
      runInAction(() => {
        this.contact = { ...this.contact, ...response.data };
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Unknown error occurred";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
