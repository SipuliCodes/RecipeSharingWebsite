import { useEffect } from 'react';

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    console.log(textAreaRef);
    if (textAreaRef) {
      textAreaRef.style.height = '60px';
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
