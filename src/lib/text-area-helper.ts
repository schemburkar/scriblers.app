export const TextAreaClassName = "textarea";
export const TextAreaElement = (): HTMLTextAreaElement =>
  document.querySelector(`.${TextAreaClassName}`)!;

export const getSelection = () => {
  const textarea = TextAreaElement();

  const start = textarea.getAttribute("selectionStart");
  const end = textarea.getAttribute("selectionEnd");

  if (!start || !end) return [0, 0];

  return [+start, +end];
};

export const setSelection = (start: number, end: number) => {
  const textarea = TextAreaElement();

  textarea.setSelectionRange(start, end);
  textarea.setAttribute("selectionStart", `${start}`);
  textarea.setAttribute("selectionEnd", `${end}`);
  textarea.focus();
};
