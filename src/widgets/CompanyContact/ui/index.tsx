import styles from "pages/MainPage/ui/MainPage.module.scss";
import { Loader } from "shared/ui";
import { useStore } from "app/providers/StoreProvider";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ContactActions } from "./ContactActions";

export const CompanyContact = observer(() => {
  const { contactStore } = useStore();

  useEffect(() => {
    contactStore.fetchContacts("16");
  }, [contactStore]);

  if (contactStore.isLoading) {
    return <Loader />;
  }

  if (contactStore.error) {
    return <div className={styles.error}>Error: {contactStore.error}</div>;
  }

  if (!contactStore.contact) {
    return <div className={styles.error}>Контакты не найдены</div>;
  }

  return <ContactActions contact={contactStore.contact} />;
});
