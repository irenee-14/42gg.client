import dynamic from 'next/dynamic';
import { Paper } from '@mui/material';
import { QUILL_FORMATS } from 'types/quillTypes';
import 'react-quill/dist/quill.snow.css';
import DynamicQuill from 'components/DynamicQuill';
import styles from 'styles/admin/recruitments/recruitmentDetail/components/QuillDescription.module.scss';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface QuillDescriptionViewerProps {
  contents: string;
}

export default function QuillDescriptionViewer({
  contents,
}: QuillDescriptionViewerProps) {
  return (
    <Paper elevation={3} className={styles.quillViewerWrapper}>
      <DynamicQuill
        className={styles.quillViewer}
        readOnly={true}
        formats={QUILL_FORMATS}
        value={contents}
        theme='bubble'
      />
    </Paper>
  );
}
