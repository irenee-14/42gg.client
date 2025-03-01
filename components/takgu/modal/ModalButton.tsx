import LoadingButton from 'components/takgu/modal/LoadingButton';
import styles from 'styles/takgu/modal/Modal.module.scss';

type ButtonProps = {
  style: 'positive' | 'negative' | 'close';
  value: string;
  form?: string;
  isLoading?: boolean;
  onClick: () => void;
};

export function ModalButtonContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.modalButtonContainer}>{children}</div>;
}

export function ModalButton({
  style,
  value,
  onClick,
  form,
  isLoading,
}: ButtonProps) {
  return (
    <div className={styles[style]}>
      {isLoading ? (
        <LoadingButton />
      ) : (
        <input onClick={onClick} type='button' value={value} form={form} />
      )}
    </div>
  );
}
