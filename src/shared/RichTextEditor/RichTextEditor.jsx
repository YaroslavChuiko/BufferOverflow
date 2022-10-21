import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import '../../styles/vendors/react-quill/quill.snow.css';

import s from './RichTextEditor.module.scss';

const modules = {
  toolbar: [
    [{ 'header': [3, 4, 5, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'blockquote', 'image', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['clean'],
  ],
  // clipboard: {
  //   matchVisual: false,
  // },
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const RichTextEditor = ({ editorValue, setEditorValue }) => {
  const handleEditorChange = (val) => {
    setEditorValue(val);
  };

  return (
    <div className={s.richTextEditor}>
      <ReactQuill
        theme="snow"
        style={{ borderColor: 'red' }}
        modules={modules}
        formats={formats}
        value={editorValue}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextEditor;
