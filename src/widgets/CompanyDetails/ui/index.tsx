import styles from "pages/MainPage/ui/MainPage.module.scss";
import mainStyles from "./CompanyDetails.module.scss";
import { ActionButton, Input } from "shared/ui";
import { ICompany } from "entities/Company";
import {
  formatCompanyTypes,
  formatDate,
  ICompanyFormData,
  parseDateInput,
} from "../model";
import { useState, useEffect, useCallback } from "react";
import { useStore } from "app/providers/StoreProvider";

export const CompanyDetails = (company: Omit<ICompany, "photos">) => {
  const { companyStore } = useStore();
  const [onEditMode, setOnEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<ICompany>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const { id, contract, businessEntity, type } = company;

  useEffect(() => {
    if (onEditMode) {
      setFormData({
        contract: {
          no: contract.no,
          issue_date: contract.issue_date,
        },
        businessEntity,
        type,
      });
    }
  }, [onEditMode, contract, businessEntity, type]);

  useEffect(() => {
    const checkChanges = () => {
      const isChanged =
        formData.contract?.no !== contract.no ||
        formData.contract?.issue_date !== contract.issue_date ||
        formData.businessEntity !== businessEntity ||
        formData.type !== type;

      setHasChanges(isChanged);
    };

    if (onEditMode) checkChanges();
  }, [formData, onEditMode, contract, businessEntity, type]);

  const handleSave = useCallback(async () => {
    if (!hasChanges) {
      setOnEditMode(false);
      return;
    }

    try {
      const updateData: ICompanyFormData = formData as ICompanyFormData;

      if (formData.contract?.no !== contract.no) {
        updateData.contract = {
          ...updateData.contract,
          no: formData.contract?.no || "",
        };
      }

      if (formData.contract?.issue_date !== contract.issue_date) {
        updateData.contract = {
          ...updateData.contract,
          issue_date: formData.contract?.issue_date || "",
        };
      }

      if (formData.businessEntity !== businessEntity) {
        updateData.businessEntity = formData.businessEntity || "";
      }

      if (formData.type !== type) {
        updateData.type = formData.type || [];
      }

      if (Object.keys(updateData).length > 0) {
        await companyStore.updateCompany(id, updateData);
      }

      setOnEditMode(false);
    } catch (error) {
      console.error("Ошибка обновления данных:", error);
    }
  }, [id, formData, hasChanges, companyStore, contract, businessEntity, type]);

  const handleContractNoChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      contract: {
        no: value,
        issue_date: prev.contract?.issue_date || contract.issue_date,
      },
    }));
  };

  const handleIssueDateChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      contract: {
        issue_date: parseDateInput(value),
        no: prev.contract?.no || contract.no,
      },
    }));
  };

  const handleBusinessEntityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      businessEntity: value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: [value],
    }));
  };

  return (
    <div className={styles.content__item}>
      <div className={styles.head}>
        <h3 className={styles.title}>Company Details</h3>

        <ActionButton
          text={onEditMode ? "Save" : "Edit"}
          onClick={onEditMode ? handleSave : () => setOnEditMode(true)}
          path={
            onEditMode
              ? "M16.875 5.62537L8.125 14.375L3.75 10.0004"
              : "M7.24112 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.692C3.19085 16.5748 3.125 16.4158 3.125 16.25V12.7589C3.125 12.6768 3.14117 12.5956 3.17258 12.5197C3.20398 12.4439 3.25002 12.375 3.30806 12.317L12.6831 2.94197C12.8003 2.82476 12.9592 2.75891 13.125 2.75891C13.2908 2.75891 13.4497 2.82476 13.5669 2.94197L17.0581 6.43309C17.1753 6.5503 17.2411 6.70927 17.2411 6.87503C17.2411 7.04079 17.1753 7.19976 17.0581 7.31697L7.68306 16.692C7.62502 16.75 7.55612 16.796 7.48029 16.8275C7.40447 16.8589 7.32319 16.875 7.24112 16.875M10.625 5L15 9.375M7.46011 16.8351L3.16479 12.5398"
          }
          disabled={onEditMode && companyStore.isLoading}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.data_row}>
          <p className={styles.data_row__article}>Agreement:</p>

          <div className={`${styles.data_row__value} ${mainStyles.dateBlock}`}>
            <Input
              value={onEditMode ? formData.contract?.no || "" : contract.no}
              disabled={!onEditMode}
              onChange={handleContractNoChange}
              style={{ maxWidth: !onEditMode ? "72px" : "" }}
            />

            <p className={mainStyles.slash}>/</p>

            <Input
              disabled={!onEditMode}
              onChange={handleIssueDateChange}
              value={
                onEditMode
                  ? formatDate(formData.contract?.issue_date || "")
                  : formatDate(contract.issue_date)
              }
              style={{ maxWidth: !onEditMode ? "72px" : "" }}
            />
          </div>
        </div>

        <div className={styles.data_row}>
          <p className={styles.data_row__article}>Business entity:</p>

          <div className={styles.data_row__value}>
            <Input
              value={
                onEditMode ? formData.businessEntity || "" : businessEntity
              }
              disabled={!onEditMode}
              onChange={handleBusinessEntityChange}
            />
          </div>
        </div>

        <div className={styles.data_row}>
          <p className={styles.data_row__article}>Company type:</p>

          <div className={styles.data_row__value}>
            <Input
              value={
                onEditMode ? formData.type?.[0] || "" : formatCompanyTypes(type)
              }
              disabled={!onEditMode}
              onChange={handleTypeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
