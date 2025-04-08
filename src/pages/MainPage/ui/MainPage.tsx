import styles from "./MainPage.module.scss";
import React, { useEffect, useState } from "react";
import {
  CompanyContact,
  CompanyDetails,
  CompanyPhotos,
  EditModal,
  RemoveModal,
} from "widgets";
import { useStore } from "app/providers/StoreProvider";
import { Loader } from "shared/ui";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const MainPage = observer(() => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);

  const { companyStore } = useStore();

  useEffect(() => {
    companyStore.fetchCompany("12");
  }, [companyStore]);

  if (companyStore.isLoading) {
    return <Loader />;
  }

  if (companyStore.error) {
    return <div className={styles.error}>Error: {companyStore.error}</div>;
  }

  if (!companyStore.company) {
    return (
      <div className={styles.error}>
        The company has not been found or has been deleted
      </div>
    );
  }

  const { photos, ...companyDetails } = companyStore.company;

  const handleRemoveCompany = () => {
    companyStore.deleteCompany("12");
  };

  const handleChangeCompanyName = (name: string) => {
    companyStore.updateCompany("12", { name });
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {isEditModalOpen && !isRemoveModalOpen && (
        <EditModal
          defaultValue={companyDetails.name}
          isActive={isEditModalOpen}
          setFunction={setIsEditModalOpen}
          handleChangeCompanyName={handleChangeCompanyName}
        />
      )}

      {isRemoveModalOpen && !isEditModalOpen && (
        <RemoveModal
          id={companyDetails.id}
          isActive={isRemoveModalOpen}
          setFunction={setIsRemoveModalOpen}
          handleRemoveCompany={handleRemoveCompany}
        />
      )}

      <section className={styles.heading}>
        <h1 className={styles.heading__title}>{companyDetails.name}</h1>

        <div className={styles.btns_container}>
          <button
            type={"button"}
            className={"circle_btn"}
            onClick={() => setIsEditModalOpen(true)}
          >
            <img
              src={"/assets/icons/Edit.svg"}
              alt={"Go back"}
              loading={"lazy"}
              draggable={false}
            />
          </button>

          <button
            type={"button"}
            className={"circle_btn"}
            onClick={() => setIsRemoveModalOpen(true)}
          >
            <img
              src={"/assets/icons/Trash_red.svg"}
              alt={"Go back"}
              loading={"lazy"}
              draggable={false}
            />
          </button>
        </div>
      </section>

      <section className={styles.content}>
        <CompanyDetails {...companyDetails} />

        <CompanyContact />

        <CompanyPhotos photos={toJS(photos)} companyId={companyDetails.id} />
      </section>
    </div>
  );
});

export default MainPage;
