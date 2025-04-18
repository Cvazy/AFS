import { useState, useRef, ChangeEvent } from "react";
import styles from "pages/MainPage/ui/MainPage.module.scss";
import moduleStyles from "./CompanyPhotos.module.scss";
import { ActionButton, Button } from "shared/ui";
import { IPhoto } from "entities/Company";
import { useStore } from "app/providers/StoreProvider";

interface CompanyPhotosProps {
  photos: IPhoto[];
  companyId: string;
}

export const CompanyPhotos = ({ photos, companyId }: CompanyPhotosProps) => {
  const { companyStore } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localLoadingId, setLocalLoadingId] = useState<string | null>(null);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !companyId) return;

    try {
      setLocalLoadingId("uploading");
      await companyStore.uploadImage(companyId, file);
    } catch (error) {
      console.error("Ошибка загрузки фото:", error);
    } finally {
      setLocalLoadingId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeletePhoto = async (photoName: string) => {
    if (!companyId) return;

    try {
      setLocalLoadingId(photoName);
      await companyStore.deleteImage(companyId, photoName);
    } catch (error) {
      console.error("Ошибка удаления фото:", error);
    } finally {
      setLocalLoadingId(null);
    }
  };

  return (
    <div className={styles.content__item}>
      <div className={styles.head}>
        <h3 className={styles.title}>Photos</h3>

        <ActionButton
          text={"Add"}
          path={
            "M18.3337 9.58329V12.1666C18.3337 14.0335 18.3337 14.9669 17.9703 15.6799C17.6508 16.3071 17.1408 16.8171 16.5136 17.1366C15.8006 17.5 14.8672 17.5 13.0003 17.5H7.00033C5.13348 17.5 4.20006 17.5 3.48702 17.1366C2.85982 16.8171 2.34988 16.3071 2.0303 15.6799C1.66699 14.9669 1.66699 14.0335 1.66699 12.1666V7.83329C1.66699 5.96645 1.66699 5.03303 2.0303 4.31999C2.34988 3.69278 2.85982 3.18285 3.48702 2.86327C4.20006 2.49996 5.13348 2.49996 7.00033 2.49996H10.417M15.8337 6.66663V1.66663M13.3337 4.16663H18.3337M13.3337 9.99996C13.3337 11.8409 11.8413 13.3333 10.0003 13.3333C8.15938 13.3333 6.66699 11.8409 6.66699 9.99996C6.66699 8.15901 8.15938 6.66663 10.0003 6.66663C11.8413 6.66663 13.3337 8.15901 13.3337 9.99996Z"
          }
          onClick={() => fileInputRef.current?.click()}
          disabled={companyStore.isLoading || !!localLoadingId}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </div>

      <div className={moduleStyles.body}>
        {photos.map((photo) => {
          const isLoading =
            localLoadingId === photo.name ||
            (localLoadingId === "uploading" && !photos.includes(photo));

          return (
            <div key={photo.name} className={moduleStyles.image_container}>
              <div className={moduleStyles.remove}>
                <Button
                  style={{ padding: "0.375rem" }}
                  onClick={() => handleDeletePhoto(photo.name)}
                  disabled={isLoading}
                >
                  <img
                    src={"/assets/icons/Trash.svg"}
                    alt={"Remove item"}
                    loading={"lazy"}
                    draggable={false}
                  />
                </Button>
              </div>

              {isLoading ? (
                <div className={moduleStyles.loading}>
                  <div className={moduleStyles.spinner} />
                </div>
              ) : (
                <img
                  src={photo.filepath}
                  alt={photo.name}
                  loading={"lazy"}
                  draggable={false}
                  className={moduleStyles.image}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
