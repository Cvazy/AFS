import { makeAutoObservable, runInAction } from "mobx";
import { apiClient } from "app/api";
import { ICompany } from "../types";

export class CompanyStore {
  company: ICompany | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCompany(id: string) {
    if (this.company) {
      return this.company;
    }

    this.isLoading = true;

    try {
      const response = await apiClient.get(`/companies/${id}`);
      runInAction(() => {
        this.company = response.data;
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

  async updateCompany(id: string, data: Partial<ICompany>) {
    this.isLoading = true;
    try {
      const response = await apiClient.patch(`/companies/${id}`, data);
      runInAction(() => {
        this.company = { ...this.company, ...response.data };
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

  async deleteCompany(id: string) {
    this.isLoading = true;
    try {
      await apiClient.delete(`/companies/${id}`);
      runInAction(() => {
        this.company = null;
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

  async uploadImage(id: string, file: File) {
    this.isLoading = true;
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post(
        `/companies/${id}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      runInAction(() => {
        if (this.company) {
          this.company.photos.push(response.data);
        }
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

  async deleteImage(id: string, imageName: string) {
    this.isLoading = true;
    try {
      await apiClient.delete(`/companies/${id}/image/${imageName}`);
      runInAction(() => {
        if (this.company) {
          this.company.photos = this.company.photos.filter(
            (photo) => photo.name !== imageName,
          );
        }
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
