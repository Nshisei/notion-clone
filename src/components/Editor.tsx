
import { locales } from '@blocknote/core';
import { useCreateBlockNote} from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { BlockNoteView } from '@blocknote/mantine';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string | null;
}

function Editor({ onChange, initialContent }: EditorProps) {
  // supabaseに保存されているテキスト型のオブジェクトを適切なオブジェクトの配列に戻る
  // initialContentがあればJSON.parseして渡す。なければundefinedを渡す
  const editor = useCreateBlockNote({
    dictionary: locales.ja,
    initialContent: initialContent != null 
      ? JSON.parse(initialContent)
      : undefined,
  });

  return (
    <div>
      <BlockNoteView 
        editor={editor}
        onChange={() => onChange(JSON.stringify(editor.document))}/>
    </div>
  );
}

export default Editor;
