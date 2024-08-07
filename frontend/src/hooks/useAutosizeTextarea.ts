import { useEffect } from 'react';

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '60px';
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = scrollHeight - 15 + 'px';
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
